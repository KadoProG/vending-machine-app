<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 実ファイルを伴う画像のみ作成する（disk + path は一意のため 1 スタブ 1 レコード）
        collect(['sample_people.png', 'sample01_plastic_bottle.png'])
            ->each(fn (string $stub) => Image::factory()->fromStub($stub)->create());
    }
}
