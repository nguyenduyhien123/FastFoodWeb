<?php

use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\ApiDiscountController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProducttypeController;
use App\Http\Controllers\ApiRateController;
use App\Http\Controllers\ApiSlideshowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::fallback(function () {
    return response()->json(['message' => 'API không tồn tại.'], 404);
});