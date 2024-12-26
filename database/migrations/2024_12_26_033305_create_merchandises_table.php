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
            $table->string('name')->comment('商品名（必須）');
            $table->foreignUuid('image_id')->nullable()->constrained('images')->comment('商品の画像ID');
            $table->decimal('price', 10, 2)->comment('商品の価格');
            $table->timestamps(); // 作成日時と更新日時を自動管理
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
