#!/bin/bash
set -e

# Copy .env.example if missing
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Generate laravel app key
php artisan key:generate

# Run the migration with seeders
php artisan migrate:fresh --seed --force

exec "$@"
