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
        Schema::create('merchandises', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('商品の一意の識別子（UUID）');
            $table->string('name', 50)->comment('商品名（必須）');
            $table->text('description')->nullable()->comment('商品の説明');
            $table->decimal('price', 10, 2)->comment('商品の価格');
            $table->foreignUuid('image_id')->nullable()->constrained('images')->comment('商品の画像ID');
            $table->foreignUuid('author_id')->constrained('users')->comment('商品を作成したユーザーのID');
            $table->foreignUuid('last_edited_id')->constrained('users')->comment('最後に編集したユーザーのID');
            $table->timestamps(); // 作成日時と更新日時を自動管理
            $table->softDeletes(); // 論理削除カラムを追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchandises');
    }
};
