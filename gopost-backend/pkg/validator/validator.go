package validator

import (
	"fmt"
	"net/mail"
	"unicode"

	"github.com/gopost/gopost-backend/pkg/response"
)

// ValidateEmail checks that the email is well-formed.
func ValidateEmail(email string) *response.FieldError {
	if email == "" {
		return &response.FieldError{Field: "email", Message: "email is required"}
	}
	if _, err := mail.ParseAddress(email); err != nil {
		return &response.FieldError{Field: "email", Message: "invalid email format"}
	}
	return nil
}

// ValidatePassword checks that the password meets complexity requirements.
func ValidatePassword(password string) *response.FieldError {
	if len(password) < 8 {
		return &response.FieldError{Field: "password", Message: "password must be at least 8 characters"}
	}
	if len(password) > 128 {
		return &response.FieldError{Field: "password", Message: "password must not exceed 128 characters"}
	}

	var hasUpper, hasLower, hasDigit bool
	for _, r := range password {
		switch {
		case unicode.IsUpper(r):
			hasUpper = true
		case unicode.IsLower(r):
			hasLower = true
		case unicode.IsDigit(r):
			hasDigit = true
		}
	}

	if !hasUpper || !hasLower || !hasDigit {
		return &response.FieldError{
			Field:   "password",
			Message: "password must contain at least one uppercase letter, one lowercase letter, and one digit",
		}
	}
	return nil
}

// ValidateRequired checks that a string field is not empty.
func ValidateRequired(field, value string) *response.FieldError {
	if value == "" {
		return &response.FieldError{
			Field:   field,
			Message: fmt.Sprintf("%s is required", field),
		}
	}
	return nil
}

// CollectErrors gathers non-nil field errors into a slice.
func CollectErrors(errs ...*response.FieldError) []response.FieldError {
	var result []response.FieldError
	for _, e := range errs {
		if e != nil {
			result = append(result, *e)
		}
	}
	return result
}
