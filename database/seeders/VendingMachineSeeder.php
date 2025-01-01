<?php

namespace Database\Seeders;

use App\Models\Background;
use App\Models\Image;
use App\Models\User;
use App\Models\VendingMachine;
use Illuminate\Database\Seeder;

class VendingMachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker_uuid = '00000000-0000-0000-0000-000000000000';
        Background::factory()->create([
            'id' => $faker_uuid,
        ]);

        Image::factory()->create([
            'id' => $faker_uuid,
            'public_type' => 2,
        ]);

        User::factory()->create([
            'id' => $faker_uuid,
            'image_id' => $faker_uuid,
        ]);

        VendingMachine::factory(4)->create([
            'background_id' => $faker_uuid,
            'author_id' => $faker_uuid,
        ]);
    }
}
