<?php

namespace Database\Seeders;

use App\Models\Background;
use Database\Factories\BackgroundFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BackgroundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (BackgroundFactory::COLORS as $name => $css_type) {
            Background::factory()->create([
                'id' => Str::uuid()->toString(),
                'name' => $name,
                'css_type' => $css_type,
            ]);
        }
    }
}
