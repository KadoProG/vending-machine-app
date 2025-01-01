<?php

namespace App\Http\Resources\Background;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BackgroundResource extends JsonResource
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
            'css_type' => $this->css_type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
