<?php

namespace Tests\Feature\VendingMachine;

use App\Models\User;
use App\Models\VendingMachine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IndexVendingMachineTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_sees_only_published_vending_machines(): void
    {
        $published = VendingMachine::factory()->create();
        $unpublished = VendingMachine::factory()->unpublished()->create();

        $response = $this->getJson('/api/v1/vending-machines');

        $response->assertOk();

        $ids = collect($response->json('data'))->pluck('id');
        $this->assertContains($published->id, $ids);
        $this->assertNotContains($unpublished->id, $ids);
    }

    public function test_author_sees_own_unpublished_vending_machine(): void
    {
        $user = User::factory()->create();
        $own = VendingMachine::factory()->unpublished()->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/v1/vending-machines');

        $response->assertOk();

        $this->assertContains($own->id, collect($response->json('data'))->pluck('id'));
    }

    public function test_guest_can_not_show_unpublished_vending_machine(): void
    {
        $vendingMachine = VendingMachine::factory()->unpublished()->create([
            'author_id' => User::factory()->create()->id,
        ]);

        $response = $this->getJson("/api/v1/vending-machines/{$vendingMachine->id}");

        $response->assertNotFound();
    }

    public function test_other_user_can_not_show_unpublished_vending_machine(): void
    {
        $author = User::factory()->create();
        $other = User::factory()->create();
        $vendingMachine = VendingMachine::factory()->unpublished()->create([
            'author_id' => $author->id,
        ]);

        $response = $this->actingAs($other)->getJson("/api/v1/vending-machines/{$vendingMachine->id}");

        $response->assertNotFound();
    }

    public function test_author_can_show_own_unpublished_vending_machine(): void
    {
        $user = User::factory()->create();
        $vendingMachine = VendingMachine::factory()->unpublished()->create([
            'author_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->getJson("/api/v1/vending-machines/{$vendingMachine->id}");

        $response->assertOk();
        $response->assertJsonPath('data.id', $vendingMachine->id);
    }

    public function test_anyone_can_show_published_vending_machine(): void
    {
        $vendingMachine = VendingMachine::factory()->create();

        $response = $this->getJson("/api/v1/vending-machines/{$vendingMachine->id}");

        $response->assertOk();
        $response->assertJsonPath('data.is_published', true);
    }
}
