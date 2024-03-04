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
        return response()->json($carts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = new Cart();
        $cart->user_id = $request->user_id;
        $cart->product_id = $request->product_id;
        $cart->quantity = $request->quantity;
        $cart->save();

        return response()->json(['message' => 'Thêm vào giỏ hàng thành công'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cart = Cart::with('product')->find($id);
        if ($cart) {
            return response()->json($cart);
        }
        return response()->json(['message' => 'Không tìm thấy'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cart = Cart::find($id);
        if ($cart) {
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
        if ($cart) {
            $cart->delete();
            return response()->json(['message' => 'Xoá sản phẩm ra khỏi giỏ hàng thành công']);
        }
        return response()->json(['message' => 'Không tìm thấy'], 404);
    }

    /**
     * Get user's cart.
     */
    public function getCartByUser(Request $request)
    {
        $carts = Cart::with('product')->where('user_id', $request->user->id)->get();
        return response()->json($carts);
    }
}
