<?php

namespace App\Policies;

use App\Models\Image;
use App\Models\User;

class ImagePolicy
{
    /**
     * 画像を閲覧できるか判定する。
     *
     * 公開画像は誰でも閲覧できる。非公開画像は、アップロードした本人か、
     * 公開中の商品で使われている場合のみ閲覧できる。
     */
    public function view(?User $user, Image $image): bool
    {
        if ($image->isPublic()) {
            return true;
        }

        if ($user !== null && $user->id === $image->author_id) {
            return true;
        }

        // 商品が公開されていれば、その画像も公開されているとみなす
        return $image->merchandises()->published()->exists();
    }

    /**
     * 画像を削除できるか判定する。
     */
    public function delete(User $user, Image $image): bool
    {
        return $user->id === $image->author_id;
    }
}
