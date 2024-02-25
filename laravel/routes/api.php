<?php

use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\ApiAccountController;
use App\Http\Controllers\ApiAnalysisController;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ApiCartController;
use App\Http\Controllers\ApiCommentController;
use App\Http\Controllers\ApiDiscountController;
use App\Http\Controllers\ApiInvoiceController;
use App\Http\Controllers\ApiInvoiceStatusController;
use App\Http\Controllers\ApiInvoiceTrackController;
use App\Http\Controllers\ApiPaymentController;
use App\Http\Controllers\ApiPaymentMethodController;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProducttypeController;
use App\Http\Controllers\ApiRateController;
use App\Http\Controllers\ApiRoleController;
use App\Http\Controllers\ApiSlideshowController;
use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\ApiWistlistController;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

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
Route::middleware('verify-token:authencation')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('loginWithToken', [ApiAuthController::class, 'loginWithToken']);
        Route::post('change-password', [ApiAuthController::class, 'changePassword']);
    });
    Route::apiResource('comments', ApiCommentController::class)->except(['index', 'show']);
    Route::apiResource('carts', ApiCartController::class);
    Route::apiResource('paymentMethods', ApiPaymentMethodController::class)->only(['index', 'show']);
    Route::apiResource('invoices', ApiInvoiceController::class)->only(['store']);
    Route::get('getCartByUser', [ApiCartController::class, 'getCartByUser']);
    Route::apiResource('wishlists', ApiWistlistController::class);

    Route::prefix('get')->group(function () {
    });
    Route::apiResource('accounts', ApiAccountController::class)->only(['index']);
    // Các route chủ sở hữu mới truy cập được
    Route::middleware('check-account-access')->group(function () {
        Route::apiResource('accounts', ApiAccountController::class)->except(['index']);
    });
    // view
    Route::get('view/print-invoice', function (Request $request) {
        $invoice = Invoice::with(['user', 'paymentMethod', 'invoiceDetail.product', 'lastStatus.invoiceStatus', 'invoiceTracks'])->where('code', $request->code)->whereHas('user', function ($query) use ($request) {
            $query->where('id', $request->user->id);
        })->first();
        return view('invoice.printInvoice2', ['invoice' => $invoice]);
    });
    // Hoá đơn(đơn hàng)
    Route::get('getInvoiceByUser', [ApiInvoiceController::class, 'getInvoiceByUser']);
    Route::post('getInvoiceByUserAndCode', [ApiInvoiceController::class, 'getInvoiceByUserAndCode']);
    Route::post('printInvoice', [ApiInvoiceController::class, 'printInvoice']);

    // Các route liên quan đến admin
    Route::middleware('can:admin')->group(function () {
        Route::apiResource('products', ApiProductController::class)->except(['index', 'show']);
        Route::apiResource('users', ApiUserController::class);
        Route::apiResource('roles', ApiRoleController::class);
        Route::apiResource('invoices', ApiInvoiceController::class)->except(['store']);
        Route::apiResource('invoice_statuses', ApiInvoiceStatusController::class);
        Route::apiResource('invoice_tracks', ApiInvoiceTrackController::class);
        Route::get('getAllRoleExceptAdmin', [ApiRoleController::class, 'getAllRoleExceptAdmin']);
        Route::prefix('summary')->group(function () {
            Route::get('getTotalProducts', [ApiProductController::class, 'getTotalProducts']);
            Route::get('getTotalProductTypes', [ApiProducttypeController::class, 'getTotalProductTypes']);
            Route::get('getTotalUser', [ApiUserController::class, 'getTotalUser']);
            Route::get('getTotalUserIsNotVerified', [ApiUserController::class, 'getTotalUserIsNotVerified']);
            Route::get('getTotalUserIsVerified', [ApiUserController::class, 'getTotalUserIsVerified']);
            Route::get('getProductsAndComments', [ApiCommentController::class, 'getProductsAndComments']);
            Route::get('getCommentsByCriteria', [ApiCommentController::class, 'getCommentsByCriteria']);
            Route::get('getInvoiceByStatus', [ApiInvoiceController::class, 'getInvoiceByStatus']);
        });
        Route::prefix('analysis')->controller(ApiAnalysisController::class)->group(function () {
            Route::get('getTotalUsers', 'getTotalUsers');
        });
        Route::resource('analysis', ApiAnalysisController::class);
        Route::prefix('update')->group(function () {
            Route::post('updateStatusProduct/{id}', [ApiProductController::class, 'updateStatusProduct']);

        });
        Route::apiResource('producttypes', ApiProducttypeController::class);
    });

});
// Api không cần đăng nhập
Route::apiResource('products', ApiProductController::class)->only(['index', 'show']);
Route::apiResource('product_types', ApiProducttypeController::class);
Route::get('getProductsByCriteria', [ApiProductController::class, 'getProductsByCriteria'])->withoutMiddleware(['throttle']);
Route::get('generateCode', [ApiInvoiceController::class, 'generateCode']);

/// ------------------------------
Route::apiResource('comments', ApiCommentController::class)->only(['index', 'show']);



// Route::apiResource('product_types', ApiProducttypeController::class);
Route::apiResource('discounts', ApiDiscountController::class);
Route::apiResource('rates', ApiRateController::class);

Route::apiResource('slideshows', ApiSlideshowController::class);
// Route::apiResource('comments', ApiCommentController::class);
Route::fallback(function () {
    return response()->json(['message' => 'API không tồn tại.'], 404);
});

// Xử lý các thanh toán
Route::prefix('payment')->group(function () {
    Route::get('success', [ApiPaymentController::class, 'paymentSuccess']);
    Route::get('fail', [ApiPaymentController::class, 'paymentFail']);
    Route::get('create', [ApiPaymentController::class, 'createLinkPayment']);
    Route::get('cancel/{orderCode}', [ApiPaymentController::class, '']);
    Route::get('getPaymentLinkInfoOfOrder/{id}', [ApiPaymentController::class, 'getPaymentLinkInfoOfOrder']);

});
Route::get('order_code', function () {
    return intval(substr(strval(Carbon::now()->getTimestampMs() * mt_rand(2, 99) * mt_rand(2, 99)), -9));
});
 

Route::controller(ApiAuthController::class)->prefix('auth')->group(function () {
    Route::get('encode', 'encodeJWT');
    Route::get('decode/{jwt}', 'decodeJWT');
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::post('loginGoogle', 'loginWithGoogle');
    Route::post('loginGoogleCallback', 'loginWithGoogleCallback');
    Route::post('register', 'register');
    Route::post('create', 'createSecureCode');
    Route::post('decode', 'verifySecureCode');
    Route::middleware('verify-token:verify-account')->get('verify-account', 'verifyAccount')->name('verify-account');
    // Route::match(['get','post'],'reset-password', 'resetPassword');
    Route::post('check-token-reset-password', 'checkTokenResetPassword');
    Route::post('reset-password/setPassword', 'resetPasswordSetPassword');
    Route::post('reset-password/verifyEmail', 'resetPasswordVerifyEmail');
});


Route::get('products/getProductsByProductTypeId/{productTypeId}', [ApiProductController::class, 'getProductsByProductTypeId']);
