package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"

	"github.com/gopost/gopost-backend/pkg/response"
)

// Recovery returns middleware that recovers from panics and logs the error.
func Recovery(log zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				traceID, _ := c.Get(TraceIDKey)

				log.Error().
					Interface("trace_id", traceID).
					Interface("error", err).
					Str("method", c.Request.Method).
					Str("path", c.Request.URL.Path).
					Msg("panic recovered")

				c.AbortWithStatusJSON(http.StatusInternalServerError, response.APIResponse{
					Success: false,
					Error: &response.APIError{
						Code:    "INTERNAL_ERROR",
						Message: "An unexpected error occurred",
					},
				})
			}
		}()
		c.Next()
	}
}
