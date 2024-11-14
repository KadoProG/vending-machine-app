# php:8.3-apache ベースイメージを使用
FROM php:8.3-apache

# 必要なパッケージとPHP拡張のインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apache設定ファイルのコピー
COPY ./.docker/apache/default.conf /etc/apache2/sites-available/000-default.conf

# Apacheのモジュール設定（mod_rewriteを有効化）
RUN a2enmod rewrite

# entrypointスクリプトのコピーと実行権限の付与
COPY ./.docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# 必要に応じて環境変数やポートを公開
EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
