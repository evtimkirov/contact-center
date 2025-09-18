#!/bin/bash
set -e

# Install vendor if missing
if [ ! -d vendor ]; then
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Copy .env.example if missing
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Ensure permissions
chown -R www-data:www-data storage bootstrap/cache || true
chmod -R 775 storage bootstrap/cache || true

# Generate laravel app key (if not exists)
php artisan key:generate --force

# Run the migration with seeders
php artisan migrate:fresh --seed --force

exec "$@"
