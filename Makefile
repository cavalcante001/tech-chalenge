.PHONY: run stop migrate-up migrate-down migrate-create

run:
	@echo "Starting the application..."
	docker compose up -d

stop:
	@echo "Stopping the application..."
	docker compose down

migrate-up:
	docker compose exec api-dev npm run migration:up

migrate-down:
	docker compose exec api-dev npm run migration:down

migrate-create:
	docker compose exec api-dev npm run migration:create -- $(name)
	@echo "Migration created with name: $(name)"
	@echo "Please run 'make migrate-up' to apply the migration."