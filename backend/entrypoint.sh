#!/bin/bash
set -e

echo "Clear the old database data and create new ones"
php artisan migrate:fresh --seed --force

exec "$@"
