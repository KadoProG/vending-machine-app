<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\VendingMachine;

class VendingMachineController extends Controller
{
    public function index()
    {
        $vendingMachines = VendingMachine::with('background', 'author')->paginate(10);

        return response()->json($vendingMachines);
    }
}
