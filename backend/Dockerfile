FROM php:8.2-apache

# install system deps
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libxml2-dev libicu-dev libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd intl

# redis extension
RUN pecl install redis && docker-php-ext-enable redis

# composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# apache mods
RUN a2enmod rewrite

# apache vhost
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

# copy only composer files first (cache layer)
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-scripts --prefer-dist || true

# copy app code
COPY . /var/www/html

RUN composer install --no-interaction --prefer-dist

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
