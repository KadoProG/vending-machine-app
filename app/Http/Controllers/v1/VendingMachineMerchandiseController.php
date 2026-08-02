<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\VendingMachine\VendingMachineMerchandiseResource;
use App\Models\VendingMachine;
use Illuminate\Http\Request;

class VendingMachineMerchandiseController extends Controller
{
    public function index(Request $request, VendingMachine $vendingMachine)
    {
        $merchandises = $vendingMachine->merchandises->load([
            'author' => function ($query) {
                $query->select('id', 'name', 'email', 'image_id');
            },
            'author.image' => function ($query) {
                $query->select('id', 'alt', 'image_url');
            },
            'lastEdited' => function ($query) {
                $query->select('id', 'name', 'email', 'image_id');
            },
            'author.image' => function ($query) {
                $query->select('id', 'alt', 'image_url');
            },
            'image' => function ($query) {
                $query->select('id', 'alt', 'image_url');
            },
        ]);

        return VendingMachineMerchandiseResource::collection($merchandises);
    }
}
