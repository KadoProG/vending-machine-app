<?php

namespace App\Http\Resources\VendingMachine;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendingMachineResource extends JsonResource
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
            'description' => $this->description ?? null,
            'column_count' => $this->column_count,
            'row_count' => $this->row_count,
            'background' => $this->background_id ? [
                'id' => $this->background->id ?? null,
                'css_type' => $this->background->css_type ?? null,
            ] : null,
            'author' => $this->author_id ? [
                'id' => $this->author->id ?? null,
                'name' => $this->author->name ?? null,
                'email' => $this->author->email ?? null,
                'image' => [
                    'id' => $this->author->image->id ?? null,
                    'alt' => $this->author->image->alt ?? null,
                    'url' => $this->author->image->url ?? null,
                ],
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
