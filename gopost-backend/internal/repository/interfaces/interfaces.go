package interfaces

import (
	"context"
	"io"
	"time"

	"github.com/google/uuid"

	"github.com/gopost/gopost-backend/internal/domain/entity"
)

// Pagination holds cursor-based pagination parameters.
type Pagination struct {
	Cursor string
	Limit  int
}

// UserFilter holds user query filters.
type UserFilter struct {
	Email string
	Role  string
}

// TemplateFilter holds template query filters.
type TemplateFilter struct {
	Type       entity.TemplateType
	Status     entity.TemplateStatus
	CategoryID uuid.UUID
	Tags       []string
	Query      string
	IsPremium  *bool
	Sort       string // "popular", "newest", "trending"
}

// UserRepository defines data access methods for users.
type UserRepository interface {
	Create(ctx context.Context, user *entity.User) error
	GetByID(ctx context.Context, id uuid.UUID) (*entity.User, error)
	GetByEmail(ctx context.Context, email string) (*entity.User, error)
	Update(ctx context.Context, user *entity.User) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, filter UserFilter, page Pagination) ([]*entity.User, int64, error)
}

// TemplateRepository defines data access methods for templates.
type TemplateRepository interface {
	Create(ctx context.Context, tmpl *entity.Template) error
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Template, error)
	Update(ctx context.Context, tmpl *entity.Template) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, filter TemplateFilter, page Pagination) ([]*entity.Template, int64, error)
	ListByCategory(ctx context.Context, categoryID uuid.UUID, page Pagination) ([]*entity.Template, int64, error)
	IncrementUsageCount(ctx context.Context, id uuid.UUID) error
}

// SessionRepository defines data access methods for sessions.
type SessionRepository interface {
	Set(ctx context.Context, sessionID string, data []byte, ttl time.Duration) error
	Get(ctx context.Context, sessionID string) ([]byte, error)
	Delete(ctx context.Context, sessionID string) error
	Exists(ctx context.Context, sessionID string) (bool, error)
}

// CacheRepository defines data access methods for caching.
type CacheRepository interface {
	Set(ctx context.Context, key string, value interface{}, ttl time.Duration) error
	Get(ctx context.Context, key string, dest interface{}) error
	Delete(ctx context.Context, key string) error
	Invalidate(ctx context.Context, pattern string) error
}

// StorageRepository defines data access methods for object storage.
type StorageRepository interface {
	Upload(ctx context.Context, key string, data io.Reader, contentType string) (string, error)
	Download(ctx context.Context, key string) (io.ReadCloser, error)
	Delete(ctx context.Context, key string) error
	GenerateSignedURL(ctx context.Context, key string, expiry time.Duration) (string, error)
}
