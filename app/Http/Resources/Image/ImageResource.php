<?php

namespace App\Http\Resources\Image;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // nullable な項目はキャストして型を明示する。Scramble が生成する
        // ["string","null"] 形式を openapi2aspida が読み飛ばしてしまい、
        // フロント側の型から項目が消えるため
        return [
            'id' => $this->id,
            'name' => $this->name,
            'alt' => (string) $this->alt,
            'description' => (string) $this->description,
            'mime_type' => $this->mime_type,
            'size' => $this->size,
            'width' => (int) $this->width,
            'height' => (int) $this->height,
            'public_type' => $this->public_type,
            'url' => $this->url,
        ];
    }
}
