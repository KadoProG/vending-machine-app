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
            'background' => $this->background_id ? [
                'id' => $this->background->id,
                'css_type' => $this->background->css_type,
            ] : null,
            'author' => $this->author_id ? [
                'id' => $this->author->id,
                'name' => $this->author->name,
                'email' => $this->author->email,
                'image' => [
                    'id' => $this->author->image->id,
                    'alt' => $this->author->image->alt ?? null,
                    'image_url' => $this->author->image->image_url,
                ],
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
