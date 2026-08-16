<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * is_published による公開・非公開の絞り込みを提供する。
 */
trait HasPublishedScope
{
    /**
     * 公開中のものに絞り込む。
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /**
     * 閲覧できるものに絞り込む。
     *
     * 公開中のものは誰でも閲覧できる。非公開のものは作成した本人のみ。
     */
    public function scopeViewableBy(Builder $query, ?User $user): Builder
    {
        return $query->where(function (Builder $query) use ($user) {
            $query->published();

            if ($user !== null) {
                $query->orWhere('author_id', $user->id);
            }
        });
    }
}
