<?php

namespace Database\Seeders;

use App\Models\VendingMachine;
use Illuminate\Database\Seeder;

class VendingMachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VendingMachine::factory(10)->create();
    }
}
