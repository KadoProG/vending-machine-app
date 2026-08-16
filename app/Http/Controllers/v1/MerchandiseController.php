<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Merchandise\IndexMerchandiseRequest;
use App\Http\Requests\Merchandise\UpdateMerchandiseRequest;
use App\Http\Resources\Merchandise\MerchandiseCollection;
use App\Http\Resources\Merchandise\MerchandiseResource;
use App\Models\Merchandise;
use Illuminate\Support\Facades\Gate;

class MerchandiseController extends Controller
{
    /**
     * レスポンスで参照するリレーション。
     *
     * @return array<string, callable>
     */
    private function relations(): array
    {
        return [
            'image' => function ($query) {
                $query->select('id', 'alt', 'disk', 'path', 'public_type');
            },
            'author' => function ($query) {
                $query->select('id', 'name', 'email', 'image_id');
            },
        ];
    }

    public function index(IndexMerchandiseRequest $request)
    {
        $request->validated();

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $merchandises = Merchandise::with($this->relations())
            ->paginate($perPage, ['*'], 'page', $page);

        return new MerchandiseCollection($merchandises);
    }

    /**
     * 商品を1件取得する。
     */
    public function show(Merchandise $merchandise)
    {
        return new MerchandiseResource($merchandise->load($this->relations()));
    }

    /**
     * 商品を更新する。
     *
     * 商品を作成した本人のみ更新できる。
     */
    public function update(UpdateMerchandiseRequest $request, Merchandise $merchandise)
    {
        Gate::authorize('update', $merchandise);

        $merchandise->update($request->validated());

        return new MerchandiseResource($merchandise->load($this->relations()));
    }
}
