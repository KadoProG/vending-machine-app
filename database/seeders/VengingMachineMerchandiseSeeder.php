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
        $faker_uuids = collect(range(0, 48))->map(fn () => Str::uuid()->toString());
        $uuid_user_image = Str::uuid()->toString();
        $merchandise_image_uuid = Str::uuid()->toString();

        // 同じ実ファイルを指す画像レコードは 1 件にまとめる（disk + path は一意）
        Image::factory()->fromStub('sample_people.png')->create([
            'id' => $uuid_user_image,
        ]);
        Image::factory()->fromStub('sample01_plastic_bottle.png')->create([
            'id' => $merchandise_image_uuid,
        ]);

        $this->call(BackgroundSeeder::class);
        $background_ids = Background::pluck('id');

        $faker_uuids->each(function ($uuid) use ($uuid_user_image, $merchandise_image_uuid, $background_ids) {
            $background_uuid = $background_ids->random();
            $user_uuid = Str::uuid()->toString();

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

            $merchandiseIds = [];

            for ($i = 0; $i < 10; $i++) {
                $merchandiseId = Str::uuid()->toString();
                $merchandiseIds[] = $merchandiseId;

                Merchandise::factory()->create([
                    'id' => $merchandiseId,
                    'image_id' => $merchandise_image_uuid,
                    'author_id' => $user_uuid,
                ]);
            }

            foreach ($merchandiseIds as $merchandiseId) {
                VendingMachineMerchandise::factory()->create([
                    'vending_machine_id' => $uuid,
                    'merchandise_id' => $merchandiseId,
                ]);
            }
        });
    }
}
