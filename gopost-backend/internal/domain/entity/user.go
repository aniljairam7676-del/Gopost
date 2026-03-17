package entity

import (
	"time"

	"github.com/google/uuid"
)

// User represents a registered user in the system.
type User struct {
	ID                uuid.UUID  `json:"id"`
	Email             string     `json:"email"`
	PasswordHash      string     `json:"-"`
	Name              string     `json:"name"`
	AvatarURL         string     `json:"avatar_url,omitempty"`
	OAuthProvider     string     `json:"oauth_provider,omitempty"`
	OAuthID           string     `json:"oauth_id,omitempty"`
	DeviceFingerprint string     `json:"-"`
	CreatedAt         time.Time  `json:"created_at"`
	UpdatedAt         time.Time  `json:"updated_at"`
	DeletedAt         *time.Time `json:"-"`
	Roles             []Role     `json:"roles,omitempty"`
}

// Role represents a user role for RBAC.
type Role struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
}

// UserRole represents the assignment of a role to a user.
type UserRole struct {
	ID         uuid.UUID `json:"id"`
	UserID     uuid.UUID `json:"user_id"`
	RoleID     uuid.UUID `json:"role_id"`
	AssignedAt time.Time `json:"assigned_at"`
}

// Session represents an active user session.
type Session struct {
	ID                uuid.UUID `json:"id"`
	UserID            uuid.UUID `json:"user_id"`
	RefreshTokenHash  string    `json:"-"`
	DeviceFingerprint string    `json:"device_fingerprint,omitempty"`
	IPAddress         string    `json:"ip_address,omitempty"`
	UserAgent         string    `json:"user_agent,omitempty"`
	ExpiresAt         time.Time `json:"expires_at"`
	CreatedAt         time.Time `json:"created_at"`
}

// HasRole checks if the user has a specific role.
func (u *User) HasRole(roleName string) bool {
	for _, r := range u.Roles {
		if r.Name == roleName {
			return true
		}
	}
	return false
}
