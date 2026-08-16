<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

// SPA のフォールバック。定義済みのルートに一致しなかった場合のみ処理するため、
// 必ず他のルートより後に登録する。
//
// api 配下は除外する。含めてしまうと未定義の API パスがフロントの HTML を
// 返してしまい、クライアントが JSON をパースできずに失敗するため。
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api(/|$)).*');
