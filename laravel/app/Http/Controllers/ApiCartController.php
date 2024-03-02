<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class ApiCartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Cart::with('product')->get();
        return $carts;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        $cart = Cart::find($id);
        if (!empty($cart)) {
            $cart->quantity = $request->quantity;
            $cart->save();
            return response()->json(['message' => 'Cập nhật giỏ hàng thành công']);

        }
        return response()->json(['message' => 'Không tìm thấy'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cart = Cart::find($id);
        if (!empty($cart)) {
            $cart->delete();
            return response()->json(['message' => 'Xoá sản phẩm ra giỏ hàng thành công']);

        }
        return response()->json(['message' => 'Không tìm thấy'], 404);
    }
    public function getCartByUser(Request $request)
    {
        $carts = Cart::with('product')->where('user_id', $request->user->id)->get();
        return $carts;
    }
}
