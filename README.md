# 自販機App

## 起動方法

### 初回セットアップ

事前に `node`, `docker` が入っている必要があります。

バックエンド及びデータベースはDocker上、フロントエンドは terminal 上(Docker内でない)で起動します。

```shell
cp .env.example .env # 環境変数のコピー
docker-compose up --d # docker環境構築と起動
php artisan key:generate # キーの発行
npm ci # フロントエンドのパッケージ
```

### データテーブルの作成及び仮データ挿入

```shell
php artisan migrate --seed
```

リセットする場合は`migrate:refresh`、`migrate:rollback`などのコマンドがあります。

### 毎度行う起動

バックエンドはDockerデスクトップ上で起動してください。

```shell
npm run dev # フロントエンドの起動
```
