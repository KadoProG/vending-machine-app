<?php

use App\Http\Controllers\v1;
use Illuminate\Support\Facades\Route;

Route::get('/images/{image}', [v1\ImageController::class, 'show'])->name('images.show');
Route::post('/images', [v1\ImageController::class, 'store'])->middleware('auth:sanctum');

Route::get('/users/me', [v1\UserController::class, 'me'])->middleware('auth:sanctum');

Route::get('/merchandises', [v1\MerchandiseController::class, 'index']);
Route::get('/merchandises/{merchandise}', [v1\MerchandiseController::class, 'show']);
Route::put('/merchandises/{merchandise}', [v1\MerchandiseController::class, 'update'])->middleware('auth:sanctum');

Route::get('/vending-machines', [v1\VendingMachineController::class, 'index']);
Route::get('/vending-machines/{vendingMachine}', [v1\VendingMachineController::class, 'show']);
Route::get('/vending-machines/{vendingMachine}/merchandises', [v1\VendingMachineMerchandiseController::class, 'index']);
