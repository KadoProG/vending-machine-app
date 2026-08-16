<?php

namespace Tests\Feature\Merchandise;

use App\Models\Merchandise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IndexMerchandiseTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_sees_only_published_merchandises(): void
    {
        $published = Merchandise::factory()->create(['name' => '公開商品']);
        $unpublished = Merchandise::factory()->unpublished()->create(['name' => '非公開商品']);

        $response = $this->getJson('/api/v1/merchandises');

        $response->assertOk();

        $ids = collect($response->json('data'))->pluck('id');
        $this->assertContains($published->id, $ids);
        $this->assertNotContains($unpublished->id, $ids);
    }

    public function test_author_sees_own_unpublished_merchandise(): void
    {
        $user = User::factory()->create();
        $own = Merchandise::factory()->unpublished()->create([
            'author_id' => $user->id,
            'name' => '自分の非公開商品',
        ]);

        $response = $this->actingAs($user)->getJson('/api/v1/merchandises');

        $response->assertOk();

        $this->assertContains($own->id, collect($response->json('data'))->pluck('id'));
    }

    public function test_author_does_not_see_others_unpublished_merchandise(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $othersUnpublished = Merchandise::factory()->unpublished()->create([
            'author_id' => $other->id,
        ]);

        $response = $this->actingAs($user)->getJson('/api/v1/merchandises');

        $response->assertOk();

        $this->assertNotContains($othersUnpublished->id, collect($response->json('data'))->pluck('id'));
    }

    public function test_response_contains_is_published(): void
    {
        Merchandise::factory()->create();

        $response = $this->getJson('/api/v1/merchandises');

        $response->assertOk();
        $response->assertJsonPath('data.0.is_published', true);
    }
}
