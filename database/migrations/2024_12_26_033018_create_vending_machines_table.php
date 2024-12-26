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
            $table->string('name')->comment('自販機名（必須）');
            $table->foreignUuid('background_id')->nullable()->constrained('backgrounds')->comment('背景色のID');
            $table->foreignUuid('author_id')->constrained('users')->comment('自販機を作成したユーザーのID');
            $table->timestamps(); // 作成日時と更新日時を自動管理
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
