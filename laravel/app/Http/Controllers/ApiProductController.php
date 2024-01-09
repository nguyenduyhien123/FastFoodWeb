<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ApiProductController extends Controller
{
    //hàm index chỉ trả về những sản phẩm chưa xóa
    public function index()
    {
        return Product::all();
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create(
            [
                'name' => $request['name'],
                'description' => $request['description'],
                'price' => $request['price'],
                'image' => '123', //gia tri mac dinh cua image la 123
                'product_type_id' => $request['product_type_id'],
                'star' => 5,
            ]);

        if ($request->hasFile('image')) {
            $path = $request->image->store('upload/product/' . $product->id, 'public');
            $product->image = json_encode([$path], JSON_FORCE_OBJECT);
        }

        $product->save();
        return $product;
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            return response()->json($product);
        } else {
            return response()->json([
                "message" => "Không tìm thấy sản phẩm"
            ], 404);
        }
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->status = $request->status;
            if ($request->hasFile('image')) {
                $path = $request->image->store('upload/product/' . $product->id, 'public');
                $product->image = json_encode([$path], JSON_FORCE_OBJECT);
            }
            $product->product_type_id = $request->product_type_id;
            $product->update();
            return $product;
        } else {
            return response()->json([
                'message' => "Không tìm thấy sản phẩm",
            ], 404);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $product->delete();
            return "Xóa thành công sản phẩm {$product}";
        } {
            return response()->json([
                'message' => "Không tìm thấy sản phẩm",
            ], 404);
        }
    }

    public function deletedIndex()
    {
        return DB::table('products')->whereNotNull('deleted_at');
    }
    public function getProductsByProductTypeId($productTypeId)
    {
        return Product::where('product_type_id', $productTypeId)->get();
    }
}
