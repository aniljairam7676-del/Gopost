package cache

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"

	"github.com/gopost/gopost-backend/internal/config"
)

// RedisClient wraps the go-redis client with helper methods.
type RedisClient struct {
	client *redis.Client
	log    zerolog.Logger
}

// NewRedisClient creates and connects a Redis client.
func NewRedisClient(ctx context.Context, cfg config.RedisConfig, log zerolog.Logger) (*RedisClient, error) {
	client := redis.NewClient(&redis.Options{
		Addr:         cfg.Addr(),
		Password:     cfg.Password,
		DB:           cfg.DB,
		PoolSize:     100,
		MinIdleConns: 10,
	})

	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect to Redis: %w", err)
	}

	log.Info().
		Str("addr", cfg.Addr()).
		Int("db", cfg.DB).
		Msg("Redis connection established")

	return &RedisClient{client: client, log: log}, nil
}

// Client returns the underlying go-redis client.
func (r *RedisClient) Client() *redis.Client {
	return r.client
}

// Set stores a value with an optional TTL.
func (r *RedisClient) Set(ctx context.Context, key string, value interface{}, ttl time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return fmt.Errorf("failed to marshal value: %w", err)
	}
	return r.client.Set(ctx, key, data, ttl).Err()
}

// Get retrieves a value and unmarshals it into dest.
func (r *RedisClient) Get(ctx context.Context, key string, dest interface{}) error {
	data, err := r.client.Get(ctx, key).Bytes()
	if err != nil {
		return err
	}
	return json.Unmarshal(data, dest)
}

// Delete removes one or more keys.
func (r *RedisClient) Delete(ctx context.Context, keys ...string) error {
	return r.client.Del(ctx, keys...).Err()
}

// Invalidate deletes all keys matching a pattern.
func (r *RedisClient) Invalidate(ctx context.Context, pattern string) error {
	iter := r.client.Scan(ctx, 0, pattern, 100).Iterator()
	for iter.Next(ctx) {
		if err := r.client.Del(ctx, iter.Val()).Err(); err != nil {
			r.log.Warn().Err(err).Str("key", iter.Val()).Msg("failed to delete key during invalidation")
		}
	}
	return iter.Err()
}

// Exists checks if a key exists.
func (r *RedisClient) Exists(ctx context.Context, key string) (bool, error) {
	n, err := r.client.Exists(ctx, key).Result()
	return n > 0, err
}

// HealthCheck verifies the Redis connection is alive.
func (r *RedisClient) HealthCheck(ctx context.Context) error {
	return r.client.Ping(ctx).Err()
}

// Close gracefully closes the Redis connection.
func (r *RedisClient) Close() error {
	return r.client.Close()
}
