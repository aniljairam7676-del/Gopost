.PHONY: build run test lint clean migrate-up migrate-down docker-build docker-up docker-down

# Variables
APP_NAME := gopost-api
BUILD_DIR := ./bin
MAIN_PKG := ./cmd/server
MIGRATION_DIR := file://migrations

# Build
build:
	@echo "Building $(APP_NAME)..."
	go build -o $(BUILD_DIR)/$(APP_NAME) $(MAIN_PKG)

# Run locally
run: build
	$(BUILD_DIR)/$(APP_NAME)

# Run tests
test:
	go test -v -race -count=1 ./...

# Run tests with coverage
test-cover:
	go test -v -race -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

# Lint
lint:
	golangci-lint run ./...

# Clean build artifacts
clean:
	rm -rf $(BUILD_DIR) coverage.out coverage.html

# Database migrations
migrate-up:
	migrate -source $(MIGRATION_DIR) -database "$(DB_DSN)" up

migrate-down:
	migrate -source $(MIGRATION_DIR) -database "$(DB_DSN)" down 1

migrate-create:
	@read -p "Migration name: " name; \
	migrate create -ext sql -dir migrations -seq $$name

# Docker
docker-build:
	docker build -t $(APP_NAME) -f Dockerfile .

docker-up:
	cd .. && docker-compose up -d

docker-down:
	cd .. && docker-compose down

# Format
fmt:
	gofmt -s -w .
	goimports -w .
