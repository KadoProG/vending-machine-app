<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageController extends Controller
{
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
