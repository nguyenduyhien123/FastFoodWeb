<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAccountRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiAccountController extends Controller
{
    public function index(Request $request)
    {
        return $request->user;
    }
    public function show($id)
    {
        $user = User::find($id);
        if (!empty($user)) {
            return $user;
        }
        return response()->json([
            'message' => "Người dùng không tồn tại"
        ], 404);
    }
    public function update(UpdateAccountRequest $request)
    {
        $user = User::find($request->id);
        if (!empty($user)) {
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->description = $request->description;
            $user->phone = $request->phone;
            $user->gender = $request->gender;
            $user->birthday = $request->birthday;
            $user->address = $request->address;
            // Kiểm tra người dùng có upload ảnh không
            if($request->avatar == null)
            {
                $request->validate([
                    'avatar' => 'required|mimes:jpg,jpeg,png,bmp|max:10240', // Kiểm tra định dạng hình ảnh và kích thước tối đa là 10MB
                ]);
                $avatar = $request->file('avatar');
                $nameFile = Str::random(20) . Str::random(20) . '_user_' . $user->id . '.' . $avatar->getClientOriginalExtension();
                $avatar->storeAs('public/Uploads', $nameFile);
                $user->avatar = $nameFile;
            }
            else if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
                $request->validate([
                    'avatar' => 'mimes:jpg,jpeg,png,bmp|max:10240', // Kiểm tra định dạng hình ảnh và kích thước tối đa là 10MB
                ]);
                $avatar = $request->file('avatar');
                $nameFile = Str::random(20) . Str::random(20) . '_user_' . $user->id . '.' . $avatar->getClientOriginalExtension();
                $avatar->storeAs('public/Uploads', $nameFile);
                $user->avatar = $nameFile;
            }
            $user->save();
            return response()->json(['message' => 'Cập nhật thành công']);
        } 
        return response()->json(['message' => 'Không tìm thấy người dùng này'], 404);
    }
}
