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
        Schema::create('vending_machines', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('自販機の一意の識別子（UUID）');
            $table->string('name', 50)->comment('自販機名（必須）');
            $table->string('description')->nullable()->comment('自販機の説明');
            $table->unsignedTinyInteger('column_count')->default(10)->comment('棚の列数（横方向の商品数）');
            $table->unsignedTinyInteger('row_count')->default(3)->comment('棚の行数（縦方向の商品数）');
            $table->boolean('is_published')->default(true)->index()->comment('自販機を公開するか');
            $table->foreignUuid('background_id')->nullable()->constrained('backgrounds')->comment('背景色のID');
            $table->foreignUuid('author_id')->nullable()->constrained('users')->comment('自販機を作成したユーザーのID');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vending_machines');
    }
};
