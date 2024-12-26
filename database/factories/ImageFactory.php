<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
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
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'image_url' => $this->faker->imageUrl(),
            'public_type' => $this->faker->randomElement(['public', 'private']),
            'author_id' => null,
        ];
    }
}
