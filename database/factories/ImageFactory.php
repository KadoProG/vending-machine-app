<?php

namespace Database\Factories;

use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

/**
 * @extends Factory<Image>
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
        $name = $this->faker->word();

        return [
            'id' => $this->faker->uuid(),
            'name' => $name,
            'alt' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(),
            'disk' => ImageService::DISK_PUBLIC,
            'path' => 'images/'.$this->faker->uuid().'.png',
            'original_name' => $name.'.png',
            'mime_type' => 'image/png',
            'size' => $this->faker->numberBetween(1024, 2048 * 1024),
            'width' => 640,
            'height' => 480,
            'public_type' => Image::PUBLIC_TYPE_PUBLIC,
            'author_id' => null,
        ];
    }

    /**
     * 非公開の画像を作成する。
     */
    public function private(): static
    {
        return $this->state(fn (array $attributes) => [
            'disk' => ImageService::DISK_PRIVATE,
            'public_type' => Image::PUBLIC_TYPE_PRIVATE,
        ]);
    }

    /**
     * database/seeders/stubs 配下の実ファイルをディスクへ配置した状態にする。
     *
     * DB のレコードだけでなく実体も伴うため、画面表示まで確認できる。
     */
    public function fromStub(string $fileName): static
    {
        return $this->state(function () use ($fileName) {
            $source = database_path('seeders/stubs/'.$fileName);
            $path = 'images/stubs/'.$fileName;

            if (! Storage::disk(ImageService::DISK_PUBLIC)->exists($path)) {
                Storage::disk(ImageService::DISK_PUBLIC)
                    ->putFileAs('images/stubs', new File($source), $fileName);
            }

            return [
                'name' => pathinfo($fileName, PATHINFO_FILENAME),
                'path' => $path,
                'original_name' => $fileName,
                'mime_type' => mime_content_type($source) ?: 'image/png',
                'size' => filesize($source),
            ];
        });
    }
}
