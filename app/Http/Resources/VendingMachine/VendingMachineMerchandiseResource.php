<?php

namespace App\Http\Resources\VendingMachine;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendingMachineMerchandiseResource extends JsonResource
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
                'url' => $this->image->url,
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
            'shelf_column' => (int) $this->pivot->shelf_column,
            'shelf_row' => (int) $this->pivot->shelf_row,
            'stock_quantity' => $this->pivot->stock_quantity,
            'temperature_status' => $this->pivot->temperature_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
