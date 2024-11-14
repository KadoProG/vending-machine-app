#!/bin/bash

# Laravelのストレージディレクトリの所有権とパーミッションを設定
chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage

# Composerの依存関係をインストール
composer install

# Apacheをフォアグラウンドで起動
exec apache2-foreground
