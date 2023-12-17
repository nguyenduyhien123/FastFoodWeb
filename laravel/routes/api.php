<?php

use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\ApiProducttypeController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
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
// Route::get('/products/{product}', function (Product $product) {
//     return $product;
// });
// Route::get('products/deleted', [ApiProductController::class, 'deletedIndex']);
Route::apiResource("/product_types", ApiProducttypeController::class);
Route::apiResource("/products", ApiProductController::class);

