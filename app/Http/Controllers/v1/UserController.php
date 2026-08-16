<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * ログイン中のユーザーを取得する。
     */
    public function show(Request $request)
    {
        return new UserResource($request->user()->load('image'));
    }
}
