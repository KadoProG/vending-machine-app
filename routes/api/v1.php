<?php

use App\Http\Controllers\v1;
use Illuminate\Support\Facades\Route;

Route::get('/vending-machines', [v1\VendingMachineController::class, 'index']);
Route::get('/vending-machines/{vendingMachine}', [v1\VendingMachineController::class, 'show']);
Route::get('/vending-machines/{vendingMachine}/merchandises', [v1\VendingMachineMerchandiseController::class, 'index']);
