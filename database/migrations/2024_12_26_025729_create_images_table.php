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
        Schema::create('images', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('画像の一意の識別子（UUID）');
            $table->string('name', 50)->comment('画像のタイトル（必須、50文字以内）');
            $table->string('alt', 50)->nullable()->comment('代替テキスト（50文字以内）');
            $table->string('description', 255)->nullable()->comment('画像の詳細説明（255文字以内）');
            $table->string('disk', 32)->default('public')->comment('保存先ディスク名（config/filesystems.php の disks キー）');
            $table->string('path')->comment('ディスク内の相対パス（ドメインを含まない）');
            $table->string('original_name')->comment('アップロード時の元ファイル名');
            $table->string('mime_type', 64)->comment('MIME タイプ（例: image/png）');
            $table->unsignedBigInteger('size')->comment('ファイルサイズ（バイト）');
            $table->unsignedInteger('width')->nullable()->comment('画像の横幅（ピクセル）');
            $table->unsignedInteger('height')->nullable()->comment('画像の高さ（ピクセル）');
            $table->enum('public_type', ['public', 'private'])->default('public')->comment('公開タイプ（public: 公開, private: 非公開）');
            $table->foreignUuid('author_id')->nullable()->constrained('users')->comment('画像をアップロードしたユーザーのID');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['disk', 'path']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
