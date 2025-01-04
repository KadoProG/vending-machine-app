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

        // リクエストから 'page' パラメータを取得 (デフォルトは1)
        $page = $request->get('page', 1);

        // リクエストから 'per_page' パラメータを取得 (デフォルトは10)
        $perPage = $request->get('per_page', 10);

        // ペジネーションを適用
        $vendingMachines = VendingMachine::with('background', 'author.image')->paginate($perPage, ['*'], 'page', $page);

        return new VendingMachineCollection($vendingMachines);
    }

    public function show(VendingMachine $vendingMachine)
    {
        return new VendingMachineResource($vendingMachine);
    }
}
