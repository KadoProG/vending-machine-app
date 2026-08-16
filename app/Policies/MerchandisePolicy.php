<?php

namespace App\Policies;

use App\Models\Merchandise;
use App\Models\User;

class MerchandisePolicy
{
    /**
     * 商品を更新できるか判定する。
     *
     * 作成した本人のみ更新できる。
     */
    public function update(User $user, Merchandise $merchandise): bool
    {
        return $merchandise->author_id !== null && $user->id === $merchandise->author_id;
    }
}
