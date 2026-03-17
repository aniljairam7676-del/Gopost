package database

import (
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/rs/zerolog"
)

// RunMigrations applies all pending database migrations.
func RunMigrations(dsn, sourceURL string, log zerolog.Logger) error {
	m, err := migrate.New(sourceURL, dsn)
	if err != nil {
		return fmt.Errorf("failed to create migrator: %w", err)
	}
	defer m.Close()

	version, dirty, _ := m.Version()
	log.Info().
		Uint("current_version", version).
		Bool("dirty", dirty).
		Msg("current migration state")

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	newVersion, _, _ := m.Version()
	log.Info().
		Uint("version", newVersion).
		Msg("migrations applied successfully")

	return nil
}
