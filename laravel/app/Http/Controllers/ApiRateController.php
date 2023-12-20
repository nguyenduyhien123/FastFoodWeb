<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRateRequest;
use App\Http\Requests\UpdateRateRequest;
use Illuminate\Http\Request;
use App\Models\Rate;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ApiRateController extends Controller
{
    public function index()
    {
        return Rate::all();
    }

    public function show($id)
    {
        $rate = Rate::find($id);
        if (!empty($rate)) {
            return $rate;
        } else {
            return response()->json([
                'message' => "Đánh giá không tồn tại"
            ], 404);
        }
    }

    public function store(StoreRateRequest $request)
    {
        $rate = Rate::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'star' => $request->star,
            'image' => '123',
            'content' => $request->content
        ]);

        if ($request->hasFile('image')) {
            $path = $request->image->store('upload/rate/' . $rate->id, 'public');
            $rate->image = $path;
        }

        $rate->save();
        return $rate;
    }

    public function update(UpdateRateRequest $request, $id)
    {
        $rate = Rate::find($id);
        if (!empty($rate)) {
            $rate->user_id = $request->user_id;
            $rate->product_id = $request->product_id;
            $rate->star = $request->star;
            if ($request->hasFile('image')) {
                $path = $request->image->store('upload/rate/' . $rate->id, 'public');
                $rate->image = $path;
            }
            $rate->content = $request->content;
            $rate->update();
            return $rate;
        } else {
            return response()->json([
                'message' => "Đánh giá không tồn tại"
            ], 404);
        }
    }

    public function destroy($id)
    {
        $rate = Rate::find($id);
        if (!empty($rate)) {
            $rate->delete();
            return response()->json([
                'message' => "Xóa đánh giá {$rate->id} thành công "
            ], 200);
        } else {
            return response()->json([
                'message' => "Đánh giá không tồn tại"
            ], 404);
        }
    }
}
