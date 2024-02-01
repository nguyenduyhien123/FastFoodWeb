<?php

use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\ApiAccountController;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ApiCartController;
use App\Http\Controllers\ApiCommentController;
use App\Http\Controllers\ApiDiscountController;
use App\Http\Controllers\ApiInvoiceController;
use App\Http\Controllers\ApiInvoiceStatusController;
use App\Http\Controllers\ApiInvoiceTrackController;
use App\Http\Controllers\ApiPaymentMethodController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProducttypeController;
use App\Http\Controllers\ApiRateController;
use App\Http\Controllers\ApiRoleController;
use App\Http\Controllers\ApiSlideshowController;
use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\ApiWistlistController;
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
date_default_timezone_set('Asia/Ho_Chi_Minh');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::apiResource('roles', ApiRoleController::class);
Route::middleware('verify-token:authencation')->group(function(){
    // Route::apiResource('users', ApiUserController::class); 
    Route::post('auth/loginWithToken', [ApiAuthController::class,'loginWithToken']);  
    Route::prefix('accounts')->controller(ApiAccountController::class)->group(function(){
        Route::get('/','index');
    });
    Route::apiResource('comments',ApiCommentController::class)->except(['index','show']);
    Route::apiResource('carts', ApiCartController::class);
    Route::apiResource('paymentMethods', ApiPaymentMethodController::class)->only(['index','show']);
    Route::apiResource('invoices', ApiInvoiceController::class)->only(['store']);
    Route::get('getCartByUser', [ApiCartController::class, 'getCartByUser']);
    Route::apiResource('wishlists', ApiWistlistController::class);
 
    Route::prefix('get')->group(function(){

    });
    // Các route liên quan đến admin
    Route::middleware('can:admin')->group(function(){
        Route::apiResource('products',ApiProductController::class)->except(['index','show']);
        Route::apiResource('users', ApiUserController::class); 
        Route::apiResource('roles', ApiRoleController::class); 
        Route::apiResource('invoices', ApiInvoiceController::class)->except(['store']);
        Route::apiResource('invoice_statuses',ApiInvoiceStatusController::class);
        Route::apiResource('invoice_tracks',ApiInvoiceTrackController::class);
        Route::get('getAllRoleExceptAdmin', [ApiRoleController::class, 'getAllRoleExceptAdmin']);
        Route::prefix('summary')->group(function(){
            Route::get('getTotalProducts',[ApiProductController::class,'getTotalProducts']);
            Route::get('getTotalProductTypes',[ApiProducttypeController::class,'getTotalProductTypes']);
            Route::get('getTotalUser',[ApiUserController::class,'getTotalUser']);
            Route::get('getTotalUserIsNotVerified',[ApiUserController::class,'getTotalUserIsNotVerified']);
            Route::get('getTotalUserIsVerified',[ApiUserController::class,'getTotalUserIsVerified']);
            Route::get('getProductsAndComments', [ApiCommentController::class,'getProductsAndComments']);
            Route::get('getCommentsByCriteria', [ApiCommentController::class, 'getCommentsByCriteria']);
            
        });
        Route::prefix('update')->group(function(){
            Route::post('updateStatusProduct/{id}',[ApiProductController::class,'updateStatusProduct']);

        });
    }); 

});
// Api không cần đăng nhập
Route::apiResource('products',ApiProductController::class)->only(['index','show']);
Route::apiResource('product_types',ApiProducttypeController::class)->only(['index','show']);
Route::get('getProductsByCriteria', [ApiProductController::class, 'getProductsByCriteria'])->withoutMiddleware(['throttle']);


/// ------------------------------
Route::apiResource('comments',ApiCommentController::class)->only(['index','show']);



// Route::apiResource('product_types', ApiProducttypeController::class);
Route::apiResource('discounts', ApiDiscountController::class);
Route::apiResource('rates', ApiRateController::class);

Route::apiResource('slideshows', ApiSlideshowController::class);
// Route::apiResource('comments', ApiCommentController::class);
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
    Route::middleware('verify-token:verify-account')->get('verify-account','verifyAccount')->name('verify-account');
});


Route::get('products/getProductsByProductTypeId/{productTypeId}',[ApiProductController::class,'getProductsByProductTypeId']);