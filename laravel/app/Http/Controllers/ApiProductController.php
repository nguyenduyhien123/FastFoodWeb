<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiProductController extends Controller
{
    public function index()
    {
        return DB::table('products')->get();
    }

    public function store(ProductRequest $request)
    {
        $validatedData = $request->validated();

        $product = Product::create(
            [
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
                'image' => '123',
                'product_type_id' => $validatedData['product_type_id'],
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
        return Product::find($id);
    }

    public function update(Request $request, $id)
    {
        return Product::find($id)->update($request->all());
    }

    public function destroy($id)
    {
        return Product::find($id)->delete();
    }
}
