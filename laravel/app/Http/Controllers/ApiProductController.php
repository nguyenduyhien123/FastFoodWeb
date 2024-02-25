<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            ]
        );
        $listImage = [];
        $files = $request->file('image');
        foreach ($files as $file) {
            $nameFile = Str::random(20) . Str::random(20) . '_product_' . $product->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/Uploads', $nameFile);
            array_push($listImage, $nameFile);
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
        $product = Product::find($id);
        if (!empty($product)) {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->status = $request->status;
            // Lấy các hình ảnh đã bị xoá
            $imagesDelete = $request->input('imageDelete');
            // Lấy các ảnh cũ
            $imageOld = json_decode($product->image, true);
            if (!empty($imagesDelete)) {
                // Lặp qua mảng các ảnh bị xoá và thực hiện xoá trong mảng ảnh cũ
                foreach ($imagesDelete as $key => $val) {
                    $index = array_search($val, $imageOld);
                    if ($index !== false) {
                        array_splice($imageOld, $index, 1);
                        // echo "Xoá thành công  $index";
                    }
                    else
                    {
                        // echo "xoá thất bại $index";
                    }

                    $filePath = "Uploads/$val";
                    // Nếu file ảnh tồn tại thì thực hiện xoá ra khỏi public
                    if (Storage::disk('public')->exists($filePath)) {
                        // Xoá ảnh
                        Storage::disk('public')->delete($filePath);
                    }
                }
            }
            // Kiểm tra có upload ảnh
            if ($request->hasFile('image')) {
                $files = $request->file('image');
                foreach ($files as $file) {
                    $nameFile = Str::random(20) . Str::random(20) . '_product_' . $product->id . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('public/Uploads', $nameFile);
                    array_push($imageOld, $nameFile);
                }
            }
            if(!empty($imageOld))
            {
                if (!empty($imagesDelete)) {
                    // Lặp qua mảng các ảnh bị xoá và thực hiện xoá trong mảng ảnh cũ
                    foreach ($imagesDelete as $key => $val) {
                        $filePath = "Uploads/$val";
                        // Nếu file ảnh tồn tại thì thực hiện xoá ra khỏi public
                        if (Storage::disk('public')->exists($filePath)) {
                            // Xoá ảnh
                            Storage::disk('public')->delete($filePath);
                        }
                    }
                }
                $product->image =  json_encode($imageOld, JSON_FORCE_OBJECT);
                $product->product_type_id = $request->product_type_id;
                $product->update();
                return response()->json([
                    'message' => "Cập nhật sản phẩm thành công",
                ]);
            }
            else
            {
                throw new HttpResponseException(response()->json(['errors' => [
                    'image' => ['Sản phẩm phải có ít nhất 1 hình ảnh']
                ]], 422));
            }


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
    public function getTotalProducts()
    {
        return response()->json(['count' => Product::all()->count()]);
    }
    public function updateStatusProduct(Request $request, $id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $status = $request->input('status');
            if ($status === true || $status === false) {
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
    public function getProductsByCriteria(Request $request)
    {
        $query = Product::query();

        // Lọc theo danh mục
        if ($request->has('product_type_id')) {
            $category = $request->input('product_type_id');
            $query->whereIn('product_type_id', $category);
        } 

        // Lọc theo tên
        if ($request->has('name')) {
            $name = $request->input('name');
            if(!empty($name))
            {
            $query->where('name', 'like', "%$name%");
            }
            else
            {
                return [];
            }
        }

        // Lọc theo giá
        if ($request->has('price')) {
            $price = $request->input('price');
            if (isset($price['min']) && $price['min'] != 0) {
                $query->where('price', '>=', $price['min']);
            }
            if (isset($price['max']) && $price['max'] != 0) {
                $query->where('price', '<=', $price['max']);
            }
        }

        // Lọc theo số sao
        if ($request->has('rating')) {
            $rating = $request->input('rating');
            $query->where('rating', '>=', $rating);
        }

        $products = $query->with('productType')->get();
        return response()->json($products);
    }
}
