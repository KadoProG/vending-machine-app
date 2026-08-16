<?php

namespace Tests\Feature;

use Tests\TestCase;

class RouteFallbackTest extends TestCase
{
    public function test_undefined_api_route_returns_json_not_found(): void
    {
        $response = $this->getJson('/api/v1/undefined-endpoint');

        $response->assertNotFound();
        $response->assertHeader('Content-Type', 'application/json');
    }

    public function test_undefined_api_route_outside_version_prefix_returns_not_found(): void
    {
        $response = $this->getJson('/api/undefined-endpoint');

        $response->assertNotFound();
    }

    public function test_invalid_uuid_returns_not_found_instead_of_html(): void
    {
        $response = $this->getJson('/api/v1/merchandises/not-a-uuid');

        $response->assertNotFound();
        $this->assertStringNotContainsString('<!DOCTYPE html>', $response->getContent());
    }

    public function test_undefined_frontend_route_falls_back_to_spa(): void
    {
        $response = $this->get('/undefined-page');

        $response->assertOk();
        $response->assertSee('<div id="root">', false);
    }

    public function test_path_starting_with_api_but_not_api_prefix_falls_back_to_spa(): void
    {
        // 「api」で始まるだけのパスは API ではないため SPA が処理する
        $response = $this->get('/apitest');

        $response->assertOk();
        $response->assertSee('<div id="root">', false);
    }
}
