<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\models\Producttype;

class ApiProducttypeController extends Controller
{
    //
    public function index()
    {
        return DB::table('producttypes')->get();
    }

    public function store(Request $request)
    {
        $producttype = Producttype::create(
            [
                'name' => $request->input('name'),
                'image' => ''
            ]
        );
        if ($request->hasFile('image ')) {
            $path = $request->image->store('upload/product' . $producttype->id, 'public');
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
