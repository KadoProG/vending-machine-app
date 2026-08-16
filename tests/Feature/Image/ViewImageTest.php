<?php

namespace Tests\Feature\Image;

use App\Models\Image;
use App\Models\Merchandise;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ViewImageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake(ImageService::DISK_PRIVATE);
        Storage::fake(ImageService::DISK_PUBLIC);
    }

    public function test_anyone_can_view_public_image(): void
    {
        $image = $this->imageWithFile();

        $this->get("/api/v1/images/{$image->id}")->assertOk();
    }

    public function test_author_can_view_own_private_image(): void
    {
        $user = User::factory()->create();
        $image = $this->imageWithFile(private: true, authorId: $user->id);

        $this->actingAs($user)->get("/api/v1/images/{$image->id}")->assertOk();
    }

    public function test_guest_can_not_view_private_image(): void
    {
        $image = $this->imageWithFile(private: true, authorId: User::factory()->create()->id);

        $this->get("/api/v1/images/{$image->id}")->assertForbidden();
    }

    public function test_other_user_can_not_view_private_image(): void
    {
        $author = User::factory()->create();
        $other = User::factory()->create();
        $image = $this->imageWithFile(private: true, authorId: $author->id);

        $this->actingAs($other)->get("/api/v1/images/{$image->id}")->assertForbidden();
    }

    public function test_private_image_used_by_published_merchandise_is_viewable(): void
    {
        $author = User::factory()->create();
        $image = $this->imageWithFile(private: true, authorId: $author->id);

        Merchandise::factory()->create([
            'image_id' => $image->id,
            'author_id' => $author->id,
        ]);

        // 公開中の商品で使われているため、他人でも閲覧できる
        $this->get("/api/v1/images/{$image->id}")->assertOk();
        $this->actingAs(User::factory()->create())
            ->get("/api/v1/images/{$image->id}")
            ->assertOk();
    }

    public function test_private_image_used_by_unpublished_merchandise_is_not_viewable(): void
    {
        $author = User::factory()->create();
        $image = $this->imageWithFile(private: true, authorId: $author->id);

        Merchandise::factory()->unpublished()->create([
            'image_id' => $image->id,
            'author_id' => $author->id,
        ]);

        $this->get("/api/v1/images/{$image->id}")->assertForbidden();
    }

    public function test_author_can_still_view_image_of_own_unpublished_merchandise(): void
    {
        $author = User::factory()->create();
        $image = $this->imageWithFile(private: true, authorId: $author->id);

        Merchandise::factory()->unpublished()->create([
            'image_id' => $image->id,
            'author_id' => $author->id,
        ]);

        $this->actingAs($author)->get("/api/v1/images/{$image->id}")->assertOk();
    }

    /**
     * 実体を伴う画像レコードを作成する。
     */
    private function imageWithFile(bool $private = false, ?string $authorId = null): Image
    {
        $image = $private
            ? Image::factory()->private()->create(['author_id' => $authorId])
            : Image::factory()->create(['author_id' => $authorId]);

        Storage::disk($image->disk)->put($image->path, 'dummy');

        return $image;
    }
}
