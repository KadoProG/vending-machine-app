<?php

namespace App\Http\Resources\VendingMachine;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VendingMachineCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'current_page' => $this->currentPage(),
            'per_page' => $this->perPage(),
            'total' => $this->total(),
            'last_page' => $this->lastPage(),
        ];
    }
}
