# 自販機App

## 起動方法

### 初回セットアップ

事前に `node`, `docker` が入っている必要があります。

バックエンド及びデータベースはDocker上、フロントエンドはホストのターミナル上(Docker内でない)で起動します。

```shell
cp .env.example .env # 環境変数のコピー
docker compose up -d # docker環境構築と起動
docker compose exec laravel.test php artisan key:generate # アプリケーションキーの発行
npm ci # フロントエンドのパッケージのインストール
```

### データテーブルの作成及び仮データ挿入

```shell
docker compose exec laravel.test php artisan migrate --seed
```

リセットする場合は`migrate:refresh`、`migrate:rollback`などのコマンドが使えます。

### 毎度行う起動

バックエンドは Docker Desktop 上、もしくは `docker compose up -d` で起動してください。

```shell
npm run dev # フロントエンドの起動
```
