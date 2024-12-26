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
            $table->string('image_url')->comment('画像ファイルのURL');
            $table->enum('public_type', ['public', 'private'])->comment('公開タイプ（public: 公開, private: 非公開）');
            $table->foreignUuid('author_id')->constrained('users')->comment('画像をアップロードしたユーザーのID');
            $table->timestamps(); // 作成日時と更新日時を自動管理
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
