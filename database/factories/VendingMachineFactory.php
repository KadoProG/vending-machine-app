<?php

namespace Database\Factories;

use App\Models\VendingMachine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VendingMachine>
 */
class VendingMachineFactory extends Factory
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
            'name' => "自販機-({$this->faker->name()})",
            'description' => $this->faker->sentence(),
            'column_count' => 10,
            'row_count' => 3,
            'is_published' => true,
            // 'background_id' => \App\Models\Background::factory(),
            // 'author_id' => \App\Models\User::factory(),
        ];
    }

    /**
     * 非公開の自販機を作成する。
     */
    public function unpublished(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
        ]);
    }
}
