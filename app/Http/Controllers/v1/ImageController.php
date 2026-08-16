<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Image\StoreImageRequest;
use App\Http\Resources\Image\ImageResource;
use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageController extends Controller
{
    /**
     * 画像をアップロードする。
     *
     * 画像はアップロードした本人に紐づく非公開画像として保存する。
     * 公開中の商品で使われるようになった時点で、他のユーザーからも
     * 閲覧できるようになる（ImagePolicy::view）。
     */
    public function store(StoreImageRequest $request, ImageService $imageService): ImageResource
    {
        $image = $imageService->store(
            file: $request->file('file'),
            authorId: $request->user()->id,
            publicType: Image::PUBLIC_TYPE_PRIVATE,
            attributes: $request->safe()->only(['name', 'alt', 'description']),
        );

        return new ImageResource($image);
    }

    /**
     * 画像の実体を配信する。
     *
     * 非公開画像は Web ルート外に置かれているため、必ずこのエンドポイントを経由する。
     */
    public function show(Image $image): StreamedResponse
    {
        Gate::authorize('view', $image);

        $disk = $image->disk();

        abort_unless($disk->exists($image->path), 404);

        return $disk->response($image->path, $image->original_name, [
            'Content-Type' => $image->mime_type,
        ]);
    }
}
