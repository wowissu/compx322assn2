FROM php:8.1.2-fpm-bullseye

WORKDIR /workspaces

# VOLUME ["/var/cache/apt"]

RUN apt-get update
RUN apt-get install -y git libpng-dev zlib1g-dev libzip-dev libonig-dev

# RUN docker-php-ext-install mysql mysqli
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install gd && docker-php-ext-enable gd
RUN docker-php-ext-install zip && docker-php-ext-enable zip
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql