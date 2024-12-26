<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('ユーザーの主キー（UUID）');
            $table->string('name')->comment('ユーザー名');
            $table->string('email')->unique()->comment('メールアドレス（ユニーク制約付き）');
            $table->timestamp('email_verified_at')->nullable()->comment('メールアドレスの確認日時');
            $table->string('password')->comment('ユーザーのパスワード');
            $table->rememberToken()->comment('リメンバートークン');
            $table->timestamps(); // 作成日時と更新日時を自動管理
            $table->softDeletes()->comment('削除日時（ソフトデリート用）');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary()->comment('パスワードリセット用のメールアドレス（主キー）');
            $table->string('token')->comment('リセットトークン');
            $table->timestamp('created_at')->nullable()->comment('トークンの作成日時');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('セッションID（UUID）');
            $table->foreignUuid('user_id')->nullable()->index()->comment('関連付けられたユーザーID');
            $table->string('ip_address', 45)->nullable()->comment('ユーザーのIPアドレス');
            $table->text('user_agent')->nullable()->comment('ユーザーエージェント情報');
            $table->longText('payload')->comment('セッションデータのペイロード');
            $table->integer('last_activity')->index()->comment('最後のアクティビティ時刻');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
