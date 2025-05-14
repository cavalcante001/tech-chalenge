.PHONY: init run stop migrate-up migrate-down migrate-create

MIGRATION_PATH=migrations

init:
	@echo "Starting only the database container..."
	docker compose up -d postgres-dev
	@echo "Running migrations..."
	docker compose run --rm --no-deps api-dev npm run migration:up

run:
	@echo "Starting the application locally..."
	npm run start:dev

clean:
	@echo "Stopping and removing all containers..."
	docker compose down --rmi all

migrate-up:
	docker compose run --rm --no-deps api-dev npm run migration:up

migrate-down:
	docker compose run --rm --no-deps api-dev npm run migration:down

migrate-create:
	@if [ -z "$(name)" ]; then \
		echo "You must provide a migration name: make migrate-create name=MinhaMigration"; \
		exit 1; \
	fi
	docker compose run --rm --no-deps api-dev npm run migration:create -- $(MIGRATION_PATH)/$(name)
	@echo "Migration created: $(MIGRATION_PATH)/$(name)"
	@echo "Run 'make migrate-up' to apply the migration."