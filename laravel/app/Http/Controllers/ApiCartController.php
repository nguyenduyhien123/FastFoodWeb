<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user;
        $cart = Cart::where('product_id', $request->product_id)->where('user_id', $user->id)->first();
        // return response()->json(isset($cart));
        if (isset($cart)) {
            if ($request->quantity == 1) {
                $cart->quantity = $cart->quantity + 1;
            } else {
                $cart->quantity = $cart->quantity + $request->quantity;
            }
            $cart->save();
            return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng', 'cart' => $cart]);
        }
        $cart = new Cart;
        $cart->user_id = $user->id; // Assuming you're using Laravel's built-in authentication
        $cart->product_id = $request->product_id;
        $cart->quantity = $request->quantity;
        $cart->save();

        return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cart = Cart::with('product')->find($id);
        if (!$cart) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng'], 404);
        }
        return response()->json($cart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::find($id);
        if (!$cart) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng'], 404);
        }

        $cart->quantity = $request->quantity;
        $cart->save();

        return response()->json(['message' => 'Cập nhật giỏ hàng thành công']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cart = Cart::find($id);
        if (!$cart) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng'], 404);
        }

        $cart->delete();

        return response()->json(['message' => 'Đã xoá sản phẩm ra khỏi giỏ hàng']);
    }

    /**
     * Get user's cart.
     */
    public function getCartByUser()
    {
        $carts = Cart::with('product')->where('user_id', Auth::id())->get();
        return response()->json($carts);
    }
}
