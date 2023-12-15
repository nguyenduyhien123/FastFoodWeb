<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducttypeRequest;
use App\Models\Producttype;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiProducttypeController extends Controller
{
    public function index()
    {
        return DB::table('producttypes')->get();
    }

    public function store(ProducttypeRequest $request)
    {
        $validatedData = $request->validated();
        $producttype = Producttype::create(
            [
                'name' => $validatedData['name'],
                'image' => '123', //gia tri mac dinh cua image la 123
            ]);
        if ($request->hasFile('image')) {
            $path = $request->image->store('upload/product/' . $producttype->id, 'public');
            $producttype->image = $path;
        }
        $producttype->save();
        return $producttype;
    }

    public function show($id)
    {
        return Producttype::find($id);
    }

    public function update(Request $request, $id)
    {
        return Producttype::find($id)->update($request->all());
    }

    public function destroy($id)
    {
        return Producttype::find($id)->delete();
    }
}
