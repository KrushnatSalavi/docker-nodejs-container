FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

RUN mkdir -p /var/www/html && chown -R www-data:www-data /var/www/html