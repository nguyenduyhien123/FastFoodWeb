<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProducttypeRequest;
use App\Http\Requests\UpdateProducttypeRequest;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiProducttypeController extends Controller
{
    //hàm index chỉ trả về những sản phẩm chưa xóa
    public function index()
    {
        return ProductType::all();
    }

    public function store(StoreProducttypeRequest $request)
    {
        $producttype = ProductType::create(
            [
                'name' => $request['name'],
                'image' => '123', //gia tri mac dinh cua image la 123
            ]);
        if ($request->hasFile('image')) {
            $path = $request->image->store('upload/product_type/' . $producttype->id, 'public');
            $producttype->image = $path;
        }
        $producttype->save();
        return $producttype;
    }

    public function show($id)
    {
        $productType = ProductType::find($id);
        if (!empty($productType)) {
            return response()->json($productType);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }
    }

    public function update(UpdateProducttypeRequest $request, $id)
    {
        $producttype = ProductType::find($id);
        if (!empty($producttype)) {
            $producttype->name = $request->name;

            if ($request->hasFile('image')) {
                $path = $request->image->store('upload/product_type/' . $producttype->id, 'public');
                $producttype->image = json_encode([$path], JSON_FORCE_OBJECT);
            }

            $producttype->update();
            return $producttype;
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $producttype = ProductType::find($id);
        $productTypeName = $producttype->name;
        if (!empty($producttype)) {
            $producttype->delete();
            return "Xóa thành công loại sản phẩm{$productTypeName}";
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }
    }
}
