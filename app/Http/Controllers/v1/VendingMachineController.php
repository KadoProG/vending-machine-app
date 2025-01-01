<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\VendingMachine\VendingMachineCollection;
use App\Models\VendingMachine;

class VendingMachineController extends Controller
{
    public function index()
    {
        $vendingMachines = VendingMachine::with('background', 'author')->paginate(10);

        return new VendingMachineCollection($vendingMachines);
    }
}
