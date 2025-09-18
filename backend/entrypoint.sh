#!/bin/bash
set -e

# Copy .env.example to .env
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created from .env.example"
fi

# Generate the Laravel app key
php artisan key:generate

echo "Clear the old database data and create new ones"
php artisan migrate:fresh --seed --force

exec "$@"
