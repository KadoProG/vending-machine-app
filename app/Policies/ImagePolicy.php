<?php

namespace App\Policies;

use App\Models\Image;
use App\Models\User;

class ImagePolicy
{
    /**
     * 画像を閲覧できるか判定する。
     *
     * 公開画像は誰でも閲覧できる。非公開画像はアップロードしたユーザーのみ。
     */
    public function view(?User $user, Image $image): bool
    {
        if ($image->isPublic()) {
            return true;
        }

        return $user !== null && $user->id === $image->author_id;
    }

    /**
     * 画像を削除できるか判定する。
     */
    public function delete(User $user, Image $image): bool
    {
        return $user->id === $image->author_id;
    }
}
