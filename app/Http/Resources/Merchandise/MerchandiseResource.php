<?php

namespace App\Http\Resources\Merchandise;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MerchandiseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => (string) $this->description,
            'price' => $this->price,
            'image_id' => (string) $this->image_id,
            'image' => $this->image ? [
                'id' => $this->image->id,
                'alt' => $this->image->alt ?? null,
                'url' => $this->image->url,
            ] : null,
            'author_id' => (string) $this->author_id,
            'author' => $this->author ? [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ] : null,
        ];
    }
}
