package entity

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

// TemplateType represents the type of template.
type TemplateType string

const (
	TemplateTypeVideo TemplateType = "video"
	TemplateTypeImage TemplateType = "image"
)

// TemplateStatus represents the lifecycle state of a template.
type TemplateStatus string

const (
	TemplateStatusDraft         TemplateStatus = "draft"
	TemplateStatusPendingReview TemplateStatus = "pending_review"
	TemplateStatusPublished     TemplateStatus = "published"
	TemplateStatusRejected      TemplateStatus = "rejected"
)

// Template represents a media template.
type Template struct {
	ID             uuid.UUID       `json:"id"`
	Name           string          `json:"name"`
	Description    string          `json:"description,omitempty"`
	Type           TemplateType    `json:"type"`
	CategoryID     uuid.UUID       `json:"category_id"`
	CreatorID      uuid.UUID       `json:"creator_id"`
	Status         TemplateStatus  `json:"status"`
	StorageKey     string          `json:"-"`
	ThumbnailURL   string          `json:"thumbnail_url,omitempty"`
	PreviewURL     string          `json:"preview_url,omitempty"`
	Width          int             `json:"width,omitempty"`
	Height         int             `json:"height,omitempty"`
	DurationMS     int             `json:"duration_ms,omitempty"`
	LayerCount     int             `json:"layer_count,omitempty"`
	EditableFields json.RawMessage `json:"editable_fields,omitempty"`
	UsageCount     int             `json:"usage_count"`
	IsPremium      bool            `json:"is_premium"`
	Version        int             `json:"version"`
	CreatedAt      time.Time       `json:"created_at"`
	UpdatedAt      time.Time       `json:"updated_at"`
	PublishedAt    *time.Time      `json:"published_at,omitempty"`
	Category       *Category       `json:"category,omitempty"`
	Tags           []Tag           `json:"tags,omitempty"`
}

// Category represents a template category.
type Category struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Slug        string    `json:"slug"`
	Description string    `json:"description,omitempty"`
	IconURL     string    `json:"icon_url,omitempty"`
	SortOrder   int       `json:"sort_order"`
	IsActive    bool      `json:"is_active"`
}

// Tag represents a template tag.
type Tag struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
	Slug string    `json:"slug"`
}

// TemplateVersion represents a versioned snapshot of a template.
type TemplateVersion struct {
	ID            uuid.UUID `json:"id"`
	TemplateID    uuid.UUID `json:"template_id"`
	VersionNumber int       `json:"version_number"`
	StorageKey    string    `json:"-"`
	Changelog     string    `json:"changelog,omitempty"`
	CreatedAt     time.Time `json:"created_at"`
}

// TemplateAsset represents a media asset belonging to a template.
type TemplateAsset struct {
	ID          uuid.UUID `json:"id"`
	TemplateID  uuid.UUID `json:"template_id"`
	AssetType   string    `json:"asset_type"`
	StorageKey  string    `json:"-"`
	ContentHash string    `json:"content_hash,omitempty"`
	FileSize    int64     `json:"file_size,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}
