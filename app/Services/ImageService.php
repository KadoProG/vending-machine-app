<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * 公開画像の保存先ディスク。
     */
    public const DISK_PUBLIC = 'public';

    /**
     * 非公開画像の保存先ディスク（Web ルート外）。
     */
    public const DISK_PRIVATE = 'local';

    /**
     * アップロードされたファイルを保存し、Image レコードを作成する。
     *
     * @param  array{name?: string, alt?: string|null, description?: string|null}  $attributes
     */
    public function store(
        UploadedFile $file,
        ?string $authorId = null,
        string $publicType = Image::PUBLIC_TYPE_PUBLIC,
        array $attributes = [],
    ): Image {
        $disk = $this->diskFor($publicType);
        $path = $file->store($this->directory(), $disk);

        [$width, $height] = $this->dimensions($file);

        try {
            return Image::create([
                'name' => $attributes['name'] ?? Str::limit(
                    pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                    50,
                    ''
                ),
                'alt' => $attributes['alt'] ?? null,
                'description' => $attributes['description'] ?? null,
                'disk' => $disk,
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'width' => $width,
                'height' => $height,
                'public_type' => $publicType,
                'author_id' => $authorId,
            ]);
        } catch (\Throwable $e) {
            // レコード作成に失敗した場合、孤児ファイルを残さない
            Storage::disk($disk)->delete($path);

            throw $e;
        }
    }

    /**
     * 画像を完全に削除し、実ファイルも取り除く。
     *
     * DB の削除が確定してからファイルを消す（ロールバック時に実体を失わないため）。
     */
    public function destroy(Image $image): void
    {
        $disk = $image->disk;
        $path = $image->path;

        $image->forceDelete();

        Storage::disk($disk)->delete($path);
    }

    /**
     * 公開タイプに対応する保存先ディスクを返す。
     */
    private function diskFor(string $publicType): string
    {
        return $publicType === Image::PUBLIC_TYPE_PUBLIC
            ? self::DISK_PUBLIC
            : self::DISK_PRIVATE;
    }

    /**
     * 1 ディレクトリにファイルが集中しないよう年月で分割する。
     */
    private function directory(): string
    {
        return 'images/'.now()->format('Y/m');
    }

    /**
     * 画像の縦横サイズを取得する。取得できない場合は null を返す。
     *
     * @return array{0: int|null, 1: int|null}
     */
    private function dimensions(UploadedFile $file): array
    {
        $size = @getimagesize($file->getRealPath());

        if ($size === false) {
            return [null, null];
        }

        return [$size[0], $size[1]];
    }
}
