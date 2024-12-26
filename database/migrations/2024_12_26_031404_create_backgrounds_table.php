<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('backgrounds', function (Blueprint $table) {
            $table->uuid('id')->primary()->comment('主キー（UUID）');
            $table->string('name', 20)->comment('背景色の名前（20文字以内）');
            $table->string('css_type', 50)->comment('CSSで指定する背景色（50文字以内）');
            $table->timestamps(); // 作成日時と更新日時を自動管理
        });

        DB::statement("ALTER TABLE `backgrounds` COMMENT = '背景色を管理するテーブル'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backgrounds');
    }
};
