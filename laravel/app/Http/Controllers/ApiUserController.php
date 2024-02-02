<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class ApiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    { 
        if($request->hasFile('avatar') && $request->file('avatar')->isValid())
        {
            $request->validate([
                'avatar' => 'mimes:jpg,jpeg,png,bmp|max:10240', // Kiểm tra định dạng hình ảnh và kích thước tối đa là 10MB
            ]);
            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'description' => $request->description,
                'email' => $request->email,
                'phone' => $request->phone,
                'birthday' => $request->birthday,
                'address' => $request->address,
                'role_id' => $request->role_id,
                'password' => $request->password
            ]);
            $avatar = $request->file('avatar');
            $nameFile = Str::random(20).Str::random(20).'_user_'.$user->id.'.'.$avatar->getClientOriginalExtension();
            $avatar->storeAs('public/Uploads', $nameFile);
            $user->avatar = $nameFile;
            $user->save();
            return response()->json(['message' => 'Tạo tài khoản thành công']);
        }
        return response()->json(['message' => 'Có vấn đề xảy ra']);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user= User::with('role')->find($user->id);
        if(empty($user))
        {
            return response()->json(['message' => 'Không tìm thấy'], 404);
        }
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        if($request->hasFile('avatar') && $request->file('avatar')->isValid())
        {
            $request->validate([
                'avatar' => 'mimes:jpg,jpeg,png,bmp|max:10240', // Kiểm tra định dạng hình ảnh và kích thước tối đa là 10MB
            ]);
            $user = User::find($request->id);
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->description = $request->description;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->birthday = $request->birthday;
            $user->address = $request->address;
            $avatar = $request->file('avatar');
            $nameFile = Str::random(20).Str::random(20).'_user_'.$user->id.'.'.$avatar->getClientOriginalExtension();
            $avatar->storeAs('public/Uploads', $nameFile);
            $user->avatar = $nameFile;
            $user->save();
            return response()->json(['message' => 'Cập nhật thành công']);
        }
        else
        {
            $user = User::find($request->id);
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->description = $request->description;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->birthday = $request->birthday;
            $user->address = $request->address;
            $user->save();
            return response()->json(['message' => 'Cập nhật thành công']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if(!empty($user))
        {
            $user->delete();
            return response()->json(['message' => 'Xoá thành công']);
        }
        return response()->json(['message' => 'Không tìm thấy người dùng này'], 404);

    }
    public function getTotalUser(){
        return response()->json(['count' => User::all()->count()]);
    }
    public function getTotalUserIsNotVerified(){
        return response()->json(['count' => User::where('email_verified_at', null)->count()]);
    }
    public function getTotalUserIsVerified(){
        return response()->json(['count' => User::where('email_verified_at','!=', null)->count()]);
    }
}
