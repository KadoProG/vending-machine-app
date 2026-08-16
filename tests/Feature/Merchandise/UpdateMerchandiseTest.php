<?php

namespace Tests\Feature\Merchandise;

use App\Models\Merchandise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateMerchandiseTest extends TestCase
{
    use RefreshDatabase;

    public function test_author_can_update_own_merchandise(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '更新後の商品名',
            'description' => '更新後の説明',
            'price' => 150,
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.name', '更新後の商品名');

        $this->assertDatabaseHas('merchandises', [
            'id' => $merchandise->id,
            'name' => '更新後の商品名',
            'description' => '更新後の説明',
        ]);
    }

    public function test_other_user_can_not_update_merchandise(): void
    {
        $author = User::factory()->create();
        $other = User::factory()->create();
        $merchandise = Merchandise::factory()->create([
            'author_id' => $author->id,
            'name' => '元の商品名',
        ]);

        $response = $this->actingAs($other)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '不正な更新',
            'price' => 150,
        ]);

        $response->assertForbidden();

        $this->assertDatabaseHas('merchandises', [
            'id' => $merchandise->id,
            'name' => '元の商品名',
        ]);
    }

    public function test_guest_can_not_update_merchandise(): void
    {
        $merchandise = Merchandise::factory()->create([
            'author_id' => User::factory()->create()->id,
        ]);

        $response = $this->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '不正な更新',
            'price' => 150,
        ]);

        $response->assertUnauthorized();
    }

    public function test_merchandise_without_author_can_not_be_updated(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->create(['author_id' => null]);

        $response = $this->actingAs($user)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '不正な更新',
            'price' => 150,
        ]);

        $response->assertForbidden();
    }

    public function test_update_requires_valid_input(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '',
            'price' => -1,
        ]);

        $response->assertJsonValidationErrors(['name', 'price']);
    }

    public function test_update_rejects_too_long_name(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => str_repeat('あ', 51),
            'price' => 150,
        ]);

        $response->assertJsonValidationErrors(['name']);
    }

    public function test_anyone_can_show_merchandise(): void
    {
        $merchandise = Merchandise::factory()->create();

        $response = $this->getJson("/api/v1/merchandises/{$merchandise->id}");

        $response->assertOk();
        $response->assertJsonPath('data.id', $merchandise->id);
    }

    public function test_show_returns_not_found_for_unknown_merchandise(): void
    {
        $response = $this->getJson('/api/v1/merchandises/'.fake()->uuid());

        $response->assertNotFound();
    }

    public function test_guest_can_not_show_unpublished_merchandise(): void
    {
        $merchandise = Merchandise::factory()->unpublished()->create([
            'author_id' => User::factory()->create()->id,
        ]);

        $response = $this->getJson("/api/v1/merchandises/{$merchandise->id}");

        $response->assertNotFound();
    }

    public function test_other_user_can_not_show_unpublished_merchandise(): void
    {
        $author = User::factory()->create();
        $other = User::factory()->create();
        $merchandise = Merchandise::factory()->unpublished()->create(['author_id' => $author->id]);

        $response = $this->actingAs($other)->getJson("/api/v1/merchandises/{$merchandise->id}");

        $response->assertNotFound();
    }

    public function test_author_can_show_own_unpublished_merchandise(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->unpublished()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->getJson("/api/v1/merchandises/{$merchandise->id}");

        $response->assertOk();
        $response->assertJsonPath('data.is_published', false);
    }

    public function test_author_can_update_own_unpublished_merchandise(): void
    {
        $user = User::factory()->create();
        $merchandise = Merchandise::factory()->unpublished()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->putJson("/api/v1/merchandises/{$merchandise->id}", [
            'name' => '非公開のまま更新',
            'price' => 150,
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.is_published', false);
    }
}
