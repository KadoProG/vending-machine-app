<?php

namespace Tests\Feature\Image;

use App\Models\Image;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class StoreImageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake(ImageService::DISK_PRIVATE);
    }

    public function test_authenticated_user_can_upload_image(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/images', [
            'file' => UploadedFile::fake()->image('sample.png', 120, 80),
        ]);

        $response->assertCreated();
        $response->assertJsonPath('data.public_type', Image::PUBLIC_TYPE_PRIVATE);

        $image = Image::sole();

        $this->assertSame($user->id, $image->author_id);
        $this->assertSame('sample', $image->name);
        Storage::disk(ImageService::DISK_PRIVATE)->assertExists($image->path);
    }

    public function test_uploaded_image_stores_metadata(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/v1/images', [
            'file' => UploadedFile::fake()->image('sample.png', 120, 80),
            'name' => 'タイトル',
            'alt' => '代替テキスト',
            'description' => '説明',
        ])->assertCreated();

        $image = Image::sole();

        $this->assertSame('タイトル', $image->name);
        $this->assertSame('代替テキスト', $image->alt);
        $this->assertSame('説明', $image->description);
        $this->assertSame(120, $image->width);
        $this->assertSame(80, $image->height);
    }

    public function test_guest_can_not_upload_image(): void
    {
        $response = $this->postJson('/api/v1/images', [
            'file' => UploadedFile::fake()->image('sample.png'),
        ]);

        $response->assertUnauthorized();
        $this->assertSame(0, Image::count());
    }

    public function test_upload_requires_file(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/images', []);

        $response->assertJsonValidationErrors(['file']);
    }

    public function test_upload_rejects_disallowed_extension(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/images', [
            'file' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
        ]);

        $response->assertJsonValidationErrors(['file']);
        $this->assertSame(0, Image::count());
    }

    public function test_upload_rejects_file_over_size_limit(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/images', [
            // 5MB を超えるファイル
            'file' => UploadedFile::fake()->image('large.png')->size(5121),
        ]);

        $response->assertJsonValidationErrors(['file']);
        $this->assertSame(0, Image::count());
    }
}
