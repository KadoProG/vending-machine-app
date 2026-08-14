<?php

namespace Database\Factories;

use App\Models\VendingMachineMerchandise;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VendingMachineMerchandise>
 */
class VendingMachineMerchandiseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            // 'vending_machine_id' => $this->faker->uuid(),
            // 'merchandise_id' => $this->faker->uuid(),
            // shelf_column / shelf_row は自販機ごとに一意である必要があるため、
            // ここでは既定値を持たせず呼び出し側で必ず指定する。
            'stock_quantity' => $this->faker->numberBetween(0, 10),
            'temperature_status' => $this->faker->randomElement(['hot', 'ice', 'default']),
        ];
    }
}
