<?php

use App\Http\Controllers\v1;
use Illuminate\Support\Facades\Route;

Route::get('/vending-machines', [v1\VendingMachineController::class, 'index']);
