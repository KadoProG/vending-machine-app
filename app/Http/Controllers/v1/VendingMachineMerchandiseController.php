<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Merchandise\MerchandiseResource;
use App\Models\VendingMachine;
use Illuminate\Http\Request;

class VendingMachineMerchandiseController extends Controller
{
    public function index(Request $request, VendingMachine $vendingMachine)
    {
        $vendingMachine->load('merchandises.image');

        return MerchandiseResource::collection($vendingMachine->merchandises);
    }
}
