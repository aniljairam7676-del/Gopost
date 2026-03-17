package router

import (
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"

	"github.com/gopost/gopost-backend/internal/router/middleware"
	"github.com/gopost/gopost-backend/pkg/response"
)

// New creates and configures the Gin router with all middleware and routes.
func New(log zerolog.Logger, env string) *gin.Engine {
	if env != "development" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()

	// Global middleware
	corsConfig := middleware.DefaultCORSConfig(env)
	r.Use(
		middleware.CORS(corsConfig),
		middleware.RequestLogging(log),
		middleware.Recovery(log),
	)

	// Health check (unauthenticated)
	r.GET("/health", func(c *gin.Context) {
		response.OK(c, gin.H{
			"status":  "healthy",
			"service": "gopost-api",
		})
	})

	r.GET("/ready", func(c *gin.Context) {
		response.OK(c, gin.H{
			"status": "ready",
		})
	})

	// API v1 route group
	v1 := r.Group("/api/v1")

	// Auth routes (public)
	auth := v1.Group("/auth")
	{
		_ = auth // Routes will be registered by controllers in Sprint 2
	}

	// Template routes (public browsing, authenticated access)
	templates := v1.Group("/templates")
	{
		_ = templates // Routes will be registered by controllers in Sprint 3
	}

	// Category routes (public)
	categories := v1.Group("/categories")
	{
		_ = categories
	}

	// User routes (authenticated)
	users := v1.Group("/users")
	{
		_ = users
	}

	// Admin routes (admin role required)
	admin := v1.Group("/admin")
	{
		_ = admin
	}

	return r
}
