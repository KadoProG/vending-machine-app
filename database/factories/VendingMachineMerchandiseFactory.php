<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VendingMachineMerchandise>
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
            'stock_quantity' => $this->faker->numberBetween(0, 10),
        ];
    }
}
