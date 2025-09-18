FROM php:8.2-apache

# Install system deps
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libxml2-dev libicu-dev libonig-dev curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd intl

# Redis
RUN pecl install redis && docker-php-ext-enable redis

# Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Apache mods
RUN a2enmod rewrite
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

# Copy composer files and install without scripts
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts --optimize-autoloader

# Copy app code
COPY . /var/www/html

# Now run composer scripts
RUN composer dump-autoload --optimize
RUN php artisan package:discover

# Permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["apache2-foreground"]
