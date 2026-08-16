<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Merchandise;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * 動作確認用のログインアカウントを作成する。
     *
     * email: test@example.com / password: password
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'test',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 商品編集の動作確認用に、本人が作成した商品を用意する
        if (Merchandise::where('author_id', $user->id)->exists()) {
            return;
        }

        $imageId = Image::value('id');

        collect(['テスト商品A', 'テスト商品B', 'テスト商品C'])->each(
            fn (string $name, int $index) => Merchandise::factory()->create([
                'name' => $name,
                'description' => 'test ユーザーが作成した商品です',
                'price' => 100 + $index * 50,
                'image_id' => $imageId,
                'author_id' => $user->id,
            ])
        );
    }
}
