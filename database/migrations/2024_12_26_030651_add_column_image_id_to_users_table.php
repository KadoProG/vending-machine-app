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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignUuid('image_id')
                ->nullable()
                ->constrained('images')
                ->onDelete('set null')
                ->comment('ユーザーのプロフィール画像のID（画像が削除されるとNULLになる）');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('image_id'); // 外部キー制約を含むカラムの削除
        });
    }
};
