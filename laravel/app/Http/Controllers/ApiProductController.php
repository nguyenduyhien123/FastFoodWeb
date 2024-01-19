<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiProductController extends Controller
{
    //hàm index chỉ trả về những sản phẩm chưa xóa
    public function index()
    {
        return Product::with('productType')->get();
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create(
            [
                'name' => $request['name'],
                'description' => $request['description'],
                'price' => $request['price'],
                'image' => '{}', 
                'product_type_id' => $request['product_type_id'],
                'star' => 5,
            ]);
            $listImage = [];
            $files = $request->file('image');
            foreach($files as $file)
            {
                $nameFile = Str::random(20).Str::random(20).'_product_'.$product->id.'.'.$file->getClientOriginalExtension();
                $file->storeAs('public/Uploads', $nameFile);
                array_push( $listImage, $nameFile);
            }
            $product->image =  json_encode($listImage, JSON_FORCE_OBJECT);
        $product->save();
        return $product;
    }

    public function show($id)
    {
        $product = Product::with('productType')->find($id);
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
        $data = $request->all();
        $images = $data['image'];
        foreach ($images as $image) {
            $arr[] = 'Chuỗi';
            // if ($image->isValid()) {
            //     // Lấy kiểu MIME của tệp tin
            //     $mimeType = $image->getMimeType();
    
            //     // Kiểm tra kiểu MIME có phải là hình ảnh
            //     $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            //     if (in_array($mimeType, $allowedMimeTypes)) {
            //         // Xử lý khi tệp tin không phải là hình ảnh
            //         array_push($arr, 'Hình ảnh');
            //     }
    
            //     // Tiếp tục xử lý khi tệp tin là hình ảnh
            // } else {
            //     // Xử lý khi tệp tin không hợp lệ
            //     array_push($arr, 'Chuỗi');
            // }
        }
        return $arr;
        $product = Product::find($id);
        if (!empty($product)) {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->status = $request->status;
            if ($request->hasFile('image')) {
                $path = $request->image->store("upload/product/{$product->id}", 'public');
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
            return response()->json(['message' => 'Xoá thành công']);
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
    public function getTotalProducts(){
        return response()->json(['count' => Product::all()->count()]);
    }
    public function updateStatusProduct(Request $request, $id){
        $product = Product::find($id);
        if (!empty($product)) {
            $status = $request->input('status');
            if($status === true || $status === false)
            {
                $product->status = $status;
                $product->save();
                return response()->json([
                    "message" => "Cập nhật trạng thái thành công"
                ]);
            }
            return response()->json([
                "message" => "Cập nhật bị lỗi"
            ]);
                } else {
            return response()->json([
                "message" => "Không tìm thấy sản phẩm"
            ], 404);
        }
    }
}
