<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendingMachine\IndexVendingMachineRequest;
use App\Http\Resources\VendingMachine\VendingMachineCollection;
use App\Http\Resources\VendingMachine\VendingMachineResource;
use App\Models\VendingMachine;

class VendingMachineController extends Controller
{
    public function index(IndexVendingMachineRequest $request)
    {
        $request->validated();

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $vendingMachines = VendingMachine::with([
            'background' => function ($query) {
                $query->select('id', 'css_type');
            },
            'author' => function ($query) {
                $query->select('id', 'name', 'email', 'image_id');
            },
            'author.image' => function ($query) {
                $query->select('id', 'alt', 'disk', 'path', 'public_type');
            },
        ])->paginate($perPage, ['*'], 'page', $page);

        return new VendingMachineCollection($vendingMachines);
    }

    public function show(VendingMachine $vendingMachine)
    {
        return new VendingMachineResource($vendingMachine);
    }
}
