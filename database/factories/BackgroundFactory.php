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
     * 背景色の名前とCSSの色指定の対応表
     *
     * @var array<string, string>
     */
    public const COLORS = [
        '赤' => '#e60012',
        '青' => '#0068b7',
        '黄' => '#fff100',
        '緑' => '#009944',
        '橙' => '#f39800',
        '紫' => '#920783',
        '桃' => '#e4007f',
        '水' => '#00a0e9',
        '茶' => '#8b4513',
        '灰' => '#808080',
        '黒' => '#000000',
        '白' => '#ffffff',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement(array_keys(self::COLORS));

        return [
            'id' => $this->faker->uuid(),
            'name' => $name,
            'css_type' => self::COLORS[$name],
        ];
    }
}
