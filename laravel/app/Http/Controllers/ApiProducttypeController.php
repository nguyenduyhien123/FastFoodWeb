<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProducttypeRequest;
use App\Http\Requests\UpdateProducttypeRequest;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                'image' => ''
            ]
        );
        $file = $request->file('image');
        $nameFile = Str::random(20) . Str::random(20) . '_producttype' . $producttype->id . '.' . $file->getClientOriginalExtension();
        $file->storeAs('public/Uploads', $nameFile);
        $producttype->image = $nameFile;
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
                'message' => 'Không tìm thấy hdanh mục'
            ], 404);
        }
    }

    public function update(UpdateProducttypeRequest $request, $id)
    {
        $producttype = ProductType::find($id);
        if (!empty($producttype)) {
            $producttype->name = $request->name;

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $nameFile = Str::random(20) . Str::random(20) . '_producttype_' . $producttype->id . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/Uploads', $nameFile);
                $producttype->image = $nameFile;
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
            return response()->json([
                'message' => "Xóa thành công danh mục {$productTypeName}"
            ]);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm'
            ], 404);
        }
    }
<<<<<<< HEAD
    public function getTotalProductTypes(){
        return response()->json(['count' => ProductType::all()->count()]);

=======
    public function getTotalProductTypes()
    {
        return response()->json(['count' => ProductType::all()->count()]);
>>>>>>> master
    }
}
