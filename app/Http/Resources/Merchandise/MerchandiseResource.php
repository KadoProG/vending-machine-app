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
            'description' => $this->description,
            'price' => $this->price,
            'image_id' => $this->image_id,
            'image' => $this->image_id ? [
                'id' => $this->image->id,
                'alt' => $this->image->alt ?? null,
                'image_url' => $this->image->image_url,
            ] : null,
            'author_id' => $this->author_id,
            'author' => $this->author_id ? [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ] : null,
            'last_edited_id' => $this->last_edited_id,
            'last_edited' => $this->last_edited_id ? [
                'id' => $this->last_edited->id,
                'name' => $this->last_edited->name,
            ] : null,
            'stock_quantity' => $this->pivot->stock_quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
