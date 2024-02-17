<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWistlistRequest;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class ApiWistlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wishlists = Wishlist::with('product')->get();

        // Tạo một mảng mới chứa thông tin bạn muốn hiển thị
        $formattedWishlists = $wishlists->map(function ($wishlist) {
            return [
                'id' => $wishlist->id,
                'product_image' => $wishlist->product->image,
                'product_name' => $wishlist->product->name,
                'product_price' => $wishlist->product->price,
            ];
        });

        return $formattedWishlists;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWistlistRequest $request)
    {
        $user = $request->user;
        $wishlist = Wishlist::where('product_id', $request->product_id)->where('user_id', $user->id)->first();
        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Đã xoá sản phẩm ra khỏi danh sách yêu thích']);
        } else {
            Wishlist::create(['product_id' => $request->product_id, 'user_id' => $user->id]);
            return response()->json(['message' => 'Thêm sản phẩm vào danh sách yêu thích thành công']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $product = $wishlist->product;

        return response()->json([
            'id' => $wishlist->id,
            'product_id' => $product->id,
            'product_image' => $product->image,
            'product_name' => $product->name,
            'product_price' => $product->price,
            // Thêm các thông tin khác của sản phẩm nếu cần
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $wishlist->delete();

        return response()->json(['message' => 'Đã xoá sản phẩm ra khỏi danh sách yêu thích']);
    }
}
