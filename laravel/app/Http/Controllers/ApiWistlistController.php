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
        //
        $wishlists = Wishlist::all();
        return $wishlists;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWistlistRequest $request)
    {
        $user = $request->user;
        $wistlist = Wishlist::where('product_id', $request->product_id)->where('user_id', $user->id)->first();
        if($wistlist)
        {   $wistlist->delete();
            return response()->json(['message' => 'Đã xoá sản phẩm ra khỏi danh sách yêu thích']);
        }
        else
        {
            Wishlist::create(['product_id' => $request->product_id, 'user_id' => $user->id]);
        return response()->json(['message' => 'Thêm sản phẩm vào danh sách yêu thích thành công']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
