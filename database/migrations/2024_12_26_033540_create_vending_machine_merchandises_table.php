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
        Schema::create('vending_machine_merchandises', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('中間テーブルの主キー（UUID）');
            $table->foreignUuid('vending_machine_id')->constrained('vending_machines')->onDelete('cascade')->comment('関連する自販機のID');
            $table->foreignUuid('merchandise_id')->constrained('merchandises')->onDelete('cascade')->comment('関連する商品のID');
            $table->integer('stock_quantity')->unsigned()->default(0)->comment('在庫数（0以上の整数）');
            $table->enum('temperature_status', ['hot', 'ice', 'default'])->comment('商品の温度状態（hot: 温かい、ice: 冷たい, default: 常温）');
            $table->timestamps(); // 作成日時と更新日時を自動管理
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vending_machine_merchandises');
    }
};
