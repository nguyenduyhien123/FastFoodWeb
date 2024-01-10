<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Http\Requests\StoreDiscountRequest;
use App\Http\Requests\UpdateDiscountRequest;

class ApiDiscountController extends Controller
{
    public function index()
    {
        return Discount::all();
    }

    public function show($id)
    {
        $discount = Discount::find($id);
        if (!empty($discount)) {
            return $discount;
        } else {
            return response()->json([
                'message' => "Không tìm thấy khuyến mãi"
            ], 404);
        }
    }
    public function store(StoreDiscountRequest $request)
    {
        $discount = Discount::create([
            'name' => $request->name,
            'percentage' => $request->percentage,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        $discount->save();
        return $discount;
    }

    public function update(UpdateDiscountRequest $request, $id)
    {
        $discount = Discount::find($id);
        if (!empty($discount)) {
            $discount->name = $request->name;
            $discount->percentage = $request->percentage;
            $discount->start_date = $request->start_date;
            $discount->end_date = $request->end_date;
            $discount->update();
            return $discount;
        } else {
            return response()->json([
                'message' => 'không tìm thấy khuyến mãi'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $discount = Discount::find($id);
        if (!empty($discount)) {
            $discount->delete();
            return "Xóa thành công khuyến mãi {$discount->id}";
        } else {
            return response()->json([
                'message' => 'Không tìm thấy khuyến mãi'
            ], 404);
        }
    }
}
