<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Merchandise\IndexMerchandiseRequest;
use App\Http\Requests\Merchandise\UpdateMerchandiseRequest;
use App\Http\Resources\Merchandise\MerchandiseCollection;
use App\Http\Resources\Merchandise\MerchandiseResource;
use App\Models\Merchandise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class MerchandiseController extends Controller
{
    public function index(IndexMerchandiseRequest $request)
    {
        $request->validated();

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $merchandises = Merchandise::viewableBy($request->user())
            ->with($this->relations())
            ->paginate($perPage, ['*'], 'page', $page);

        return new MerchandiseCollection($merchandises);
    }

    /**
     * 商品を1件取得する。
     *
     * 非公開の商品は作成した本人のみ閲覧できる。
     */
    public function show(Request $request, Merchandise $merchandise)
    {
        // 存在を秘匿するため 403 ではなく 404 を返す
        abort_unless(
            $merchandise->is_published || $request->user()?->id === $merchandise->author_id,
            404
        );

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
}
