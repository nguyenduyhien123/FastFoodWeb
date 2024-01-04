<?php

use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ApiDiscountController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProducttypeController;
use App\Http\Controllers\ApiRateController;
use App\Http\Controllers\ApiSlideshowController;
use App\Http\Controllers\ApiUserController;
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
Route::apiResource('roles', RoleController::class);
Route::middleware('verify-token')->group(function(){
    Route::apiResource('products', ApiProductController::class);
    Route::apiResource('users', ApiUserController::class);
    
});
Route::apiResource('product_types', ApiProducttypeController::class);
Route::apiResource('discounts', ApiDiscountController::class);
Route::apiResource('rates', ApiRateController::class);

Route::apiResource('slideshows', ApiSlideshowController::class);

Route::fallback(function () {
    return response()->json(['message' => 'API không tồn tại.'], 404);
});



Route::controller(ApiAuthController::class)->prefix('auth')->group(function()
{
    Route::get('encode','encodeJWT');
    Route::get('decode/{jwt}','decodeJWT');
    Route::post('login','login');
    Route::post('logout','logout');
    Route::post('loginGoogle','loginWithGoogle');
    Route::post('loginGoogleCallback','loginWithGoogleCallback');
    Route::post('register','register');
    Route::post('create','createSecureCode');
    Route::post('decode','verifySecureCode');
    Route::get('verify-account','verifyAccount')->name('verify-account');
});

