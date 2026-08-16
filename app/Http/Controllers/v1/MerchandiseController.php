<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Merchandise\IndexMerchandiseRequest;
use App\Http\Resources\Merchandise\MerchandiseCollection;
use App\Models\Merchandise;

class MerchandiseController extends Controller
{
    public function index(IndexMerchandiseRequest $request)
    {
        $request->validated();

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $merchandises = Merchandise::with([
            'image' => function ($query) {
                $query->select('id', 'alt', 'disk', 'path', 'public_type');
            },
            'author' => function ($query) {
                $query->select('id', 'name', 'email', 'image_id');
            },
        ])->paginate($perPage, ['*'], 'page', $page);

        return new MerchandiseCollection($merchandises);
    }
}
