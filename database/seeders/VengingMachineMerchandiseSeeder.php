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
        $uuid_user_image = Str::uuid()->toString();

        Image::factory()->create([
            'id' => $uuid_user_image,
            'public_type' => 2,
            'image_url' => '/images/sample_people.png',
        ]);

        // 配列のIDを使ってレコードを生成
        $faker_uuids->each(function ($uuid) use ($uuid_user_image) {
            $background_uuid = Str::uuid()->toString();
            $user_uuid = Str::uuid()->toString();
            $merchandise_image_uuid = Str::uuid()->toString();

            Background::factory()->create([
                'id' => $background_uuid,
            ]);
            Image::factory()->create([
                'id' => $merchandise_image_uuid,
                'public_type' => 2,
                'image_url' => '/images/sample01_plastic_bottle.png',
            ]);
            User::factory()->create([
                'id' => $user_uuid,
                'image_id' => $uuid_user_image,
            ]);
            VendingMachine::factory()->create([
                'id' => $uuid,
                'name' => '自販機'.substr($uuid, -3),
                'background_id' => $background_uuid,
                'author_id' => $user_uuid,
            ]);

            // 1. 手動でUUIDを生成してMerchandiseを作成
            $merchandiseIds = [];

            for ($i = 0; $i < 10; $i++) {
                $merchandiseId = Str::uuid()->toString(); // 一意のUUIDを生成
                $merchandiseIds[] = $merchandiseId;

                Merchandise::factory()->create([
                    'id' => $merchandiseId,
                    'image_id' => $merchandise_image_uuid,
                    'author_id' => $user_uuid,
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
