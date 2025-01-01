<?php

namespace App\Http\Resources\VendingMachine;

use App\Http\Resources\Background\BackgroundResource;
use App\Http\Resources\User\UserResource;
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
            'description' => $this->description,
            'background' => new BackgroundResource($this->background),
            'author' => new UserResource($this->author),
            'background_id' => $this->background_id,
            'author_id' => $this->author_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
