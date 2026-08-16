<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendingMachine\IndexVendingMachineRequest;
use App\Http\Resources\VendingMachine\VendingMachineCollection;
use App\Http\Resources\VendingMachine\VendingMachineResource;
use App\Models\VendingMachine;
use Illuminate\Http\Request;

class VendingMachineController extends Controller
{
    public function index(IndexVendingMachineRequest $request)
    {
        $request->validated();

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $vendingMachines = VendingMachine::viewableBy($request->user())
            ->with([
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

    /**
     * 自販機を1件取得する。
     *
     * 非公開の自販機は作成した本人のみ閲覧できる。
     */
    public function show(Request $request, VendingMachine $vendingMachine)
    {
        // 存在を秘匿するため 403 ではなく 404 を返す
        abort_unless(
            $vendingMachine->is_published || $request->user()?->id === $vendingMachine->author_id,
            404
        );

        return new VendingMachineResource($vendingMachine);
    }
}
