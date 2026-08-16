<?php

use App\Http\Controllers\v1;
use Illuminate\Support\Facades\Route;

Route::get('/images/{image}', [v1\ImageController::class, 'show'])->name('images.show');

Route::get('/user', [v1\UserController::class, 'show'])->middleware('auth:sanctum');

Route::get('/merchandises', [v1\MerchandiseController::class, 'index']);

Route::get('/vending-machines', [v1\VendingMachineController::class, 'index']);
Route::get('/vending-machines/{vendingMachine}', [v1\VendingMachineController::class, 'show']);
Route::get('/vending-machines/{vendingMachine}/merchandises', [v1\VendingMachineMerchandiseController::class, 'index']);
