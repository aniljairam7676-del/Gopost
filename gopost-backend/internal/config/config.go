package config

import (
	"fmt"
	"strings"
	"time"

	"github.com/spf13/viper"
)

// Config holds all application configuration.
type Config struct {
	Server        ServerConfig
	Database      DatabaseConfig
	Redis         RedisConfig
	JWT           JWTConfig
	Storage       StorageConfig
	CDN           CDNConfig
	Elasticsearch ElasticsearchConfig
	Log           LogConfig
}

type ServerConfig struct {
	Port            string        `mapstructure:"PORT"`
	Env             string        `mapstructure:"ENV"`
	ReadTimeout     time.Duration `mapstructure:"READ_TIMEOUT"`
	WriteTimeout    time.Duration `mapstructure:"WRITE_TIMEOUT"`
	ShutdownTimeout time.Duration `mapstructure:"SHUTDOWN_TIMEOUT"`
}

type DatabaseConfig struct {
	Host         string `mapstructure:"DB_HOST"`
	Port         string `mapstructure:"DB_PORT"`
	User         string `mapstructure:"DB_USER"`
	Password     string `mapstructure:"DB_PASSWORD"`
	Name         string `mapstructure:"DB_NAME"`
	SSLMode      string `mapstructure:"DB_SSL_MODE"`
	MinConns     int32  `mapstructure:"DB_MIN_CONNS"`
	MaxConns     int32  `mapstructure:"DB_MAX_CONNS"`
	MigrationDir string `mapstructure:"DB_MIGRATION_DIR"`
}

// DSN returns the PostgreSQL connection string.
func (d DatabaseConfig) DSN() string {
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=%s",
		d.User, d.Password, d.Host, d.Port, d.Name, d.SSLMode,
	)
}

type RedisConfig struct {
	Host     string `mapstructure:"REDIS_HOST"`
	Port     string `mapstructure:"REDIS_PORT"`
	Password string `mapstructure:"REDIS_PASSWORD"`
	DB       int    `mapstructure:"REDIS_DB"`
}

// Addr returns the Redis address.
func (r RedisConfig) Addr() string {
	return fmt.Sprintf("%s:%s", r.Host, r.Port)
}

type JWTConfig struct {
	Secret             string        `mapstructure:"JWT_SECRET"`
	AccessTokenExpiry  time.Duration `mapstructure:"JWT_ACCESS_EXPIRY"`
	RefreshTokenExpiry time.Duration `mapstructure:"JWT_REFRESH_EXPIRY"`
}

type StorageConfig struct {
	AccountID string `mapstructure:"R2_ACCOUNT_ID"`
	Bucket    string `mapstructure:"R2_BUCKET"`
	AccessKey string `mapstructure:"R2_ACCESS_KEY"`
	SecretKey string `mapstructure:"R2_SECRET_KEY"`
	PublicURL string `mapstructure:"R2_PUBLIC_URL"`
}

type CDNConfig struct {
	ZoneID   string `mapstructure:"CF_ZONE_ID"`
	APIToken string `mapstructure:"CF_API_TOKEN"`
	BaseURL  string `mapstructure:"CF_CDN_BASE_URL"`
}

type ElasticsearchConfig struct {
	URL string `mapstructure:"ELASTICSEARCH_URL"`
}

type LogConfig struct {
	Level string `mapstructure:"LOG_LEVEL"`
}

// Load reads configuration from environment variables.
func Load() (*Config, error) {
	v := viper.New()
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	// Server defaults
	v.SetDefault("PORT", "8080")
	v.SetDefault("ENV", "development")
	v.SetDefault("READ_TIMEOUT", "15s")
	v.SetDefault("WRITE_TIMEOUT", "15s")
	v.SetDefault("SHUTDOWN_TIMEOUT", "10s")

	// Database defaults
	v.SetDefault("DB_HOST", "localhost")
	v.SetDefault("DB_PORT", "5432")
	v.SetDefault("DB_USER", "gopost")
	v.SetDefault("DB_PASSWORD", "dev_password")
	v.SetDefault("DB_NAME", "gopost")
	v.SetDefault("DB_SSL_MODE", "disable")
	v.SetDefault("DB_MIN_CONNS", 10)
	v.SetDefault("DB_MAX_CONNS", 100)
	v.SetDefault("DB_MIGRATION_DIR", "file://migrations")

	// Redis defaults
	v.SetDefault("REDIS_HOST", "localhost")
	v.SetDefault("REDIS_PORT", "6379")
	v.SetDefault("REDIS_PASSWORD", "")
	v.SetDefault("REDIS_DB", 0)

	// JWT defaults
	v.SetDefault("JWT_SECRET", "dev-secret-change-in-production")
	v.SetDefault("JWT_ACCESS_EXPIRY", "15m")
	v.SetDefault("JWT_REFRESH_EXPIRY", "168h") // 7 days

	// Elasticsearch defaults
	v.SetDefault("ELASTICSEARCH_URL", "http://localhost:9200")

	// Log defaults
	v.SetDefault("LOG_LEVEL", "debug")

	cfg := &Config{
		Server: ServerConfig{
			Port:            v.GetString("PORT"),
			Env:             v.GetString("ENV"),
			ReadTimeout:     v.GetDuration("READ_TIMEOUT"),
			WriteTimeout:    v.GetDuration("WRITE_TIMEOUT"),
			ShutdownTimeout: v.GetDuration("SHUTDOWN_TIMEOUT"),
		},
		Database: DatabaseConfig{
			Host:         v.GetString("DB_HOST"),
			Port:         v.GetString("DB_PORT"),
			User:         v.GetString("DB_USER"),
			Password:     v.GetString("DB_PASSWORD"),
			Name:         v.GetString("DB_NAME"),
			SSLMode:      v.GetString("DB_SSL_MODE"),
			MinConns:     v.GetInt32("DB_MIN_CONNS"),
			MaxConns:     v.GetInt32("DB_MAX_CONNS"),
			MigrationDir: v.GetString("DB_MIGRATION_DIR"),
		},
		Redis: RedisConfig{
			Host:     v.GetString("REDIS_HOST"),
			Port:     v.GetString("REDIS_PORT"),
			Password: v.GetString("REDIS_PASSWORD"),
			DB:       v.GetInt("REDIS_DB"),
		},
		JWT: JWTConfig{
			Secret:             v.GetString("JWT_SECRET"),
			AccessTokenExpiry:  v.GetDuration("JWT_ACCESS_EXPIRY"),
			RefreshTokenExpiry: v.GetDuration("JWT_REFRESH_EXPIRY"),
		},
		Storage: StorageConfig{
			AccountID: v.GetString("R2_ACCOUNT_ID"),
			Bucket:    v.GetString("R2_BUCKET"),
			AccessKey: v.GetString("R2_ACCESS_KEY"),
			SecretKey: v.GetString("R2_SECRET_KEY"),
			PublicURL: v.GetString("R2_PUBLIC_URL"),
		},
		CDN: CDNConfig{
			ZoneID:   v.GetString("CF_ZONE_ID"),
			APIToken: v.GetString("CF_API_TOKEN"),
			BaseURL:  v.GetString("CF_CDN_BASE_URL"),
		},
		Elasticsearch: ElasticsearchConfig{
			URL: v.GetString("ELASTICSEARCH_URL"),
		},
		Log: LogConfig{
			Level: v.GetString("LOG_LEVEL"),
		},
	}

	return cfg, nil
}
