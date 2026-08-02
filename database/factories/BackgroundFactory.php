<?php

namespace Database\Factories;

use App\Models\Background;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Background>
 */
class BackgroundFactory extends Factory
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
            'name' => $this->faker->word(20),
            'css_type' => $this->faker->hexColor(),
        ];
    }
}
