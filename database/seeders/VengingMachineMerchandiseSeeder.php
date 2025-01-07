<?php

namespace Database\Seeders;

use App\Models\Background;
use App\Models\Image;
use App\Models\Merchandise;
use App\Models\User;
use App\Models\VendingMachine;
use App\Models\VendingMachineMerchandise;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VengingMachineMerchandiseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // UUIDを生成する配列をループで作成
        $faker_uuids = collect(range(0, 48))->map(fn () => Str::uuid()->toString());

        // 配列のIDを使ってレコードを生成
        $faker_uuids->each(function ($uuid) {
            Background::factory()->create([
                'id' => $uuid,
            ]);
            Image::factory()->create([
                'id' => $uuid,
                'public_type' => 2,
            ]);
            User::factory()->create([
                'id' => $uuid,
                'image_id' => $uuid,
            ]);
            VendingMachine::factory()->create([
                'id' => $uuid,
                'name' => '自販機'.substr($uuid, -3),
                'background_id' => $uuid,
                'author_id' => $uuid,
            ]);

            // 1. 手動でUUIDを生成してMerchandiseを作成
            $merchandiseIds = [];

            for ($i = 0; $i < 10; $i++) {
                $merchandiseId = Str::uuid()->toString(); // 一意のUUIDを生成
                $merchandiseIds[] = $merchandiseId;

                Merchandise::factory()->create([
                    'id' => $merchandiseId,
                    'image_id' => $uuid,
                ]);
            }

            // 2. VendingMachineMerchandiseを作成し、Merchandiseと連携
            foreach ($merchandiseIds as $merchandiseId) {
                VendingMachineMerchandise::factory()->create([
                    'vending_machine_id' => $uuid, // 生成したVendingMachineのIDを使用
                    'merchandise_id' => $merchandiseId, // 生成したMerchandiseのIDを使用
                ]);
            }
        });
    }
}
