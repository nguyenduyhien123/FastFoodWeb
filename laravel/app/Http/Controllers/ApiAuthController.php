<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Payload;
use Tymon\JWTAuth\Token;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class ApiAuthController extends Controller
{
    public function decodeJWT($jwt)
    {
        try {
            $token = new Token($jwt);
            $payload = JWTAuth::decode($token)->get();
            return $payload;
        } catch (TokenExpiredException $e) {
            // Xử lý khi token hết hạn
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            // Xử lý khi token không hợp lệ
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (Exception $e) {
            // Xử lý các lỗi khác nếu cần thiết
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
    public function encodeJWT($payload)
    {
        // Tạo một mảng chứa thông tin payload
        $payloadArray = [
            'iss' => 'http://localhost:8000/api/jwt/encode',
            'iat' => Carbon::now()->timestamp,
            'exp' => Carbon::now()->addHour()->timestamp,
            'nbf' => Carbon::now()->timestamp,
            'jti' => uniqid(),
            'sub' => $payload['user_id'],
            'description' => 'authencation'
        ];

        // Tạo PayloadFactory
        $payloadFactory = JWTFactory::customClaims($payloadArray);

        // Tạo Payload từ PayloadFactory
        $payload = $payloadFactory->make();

        // Mã hóa payload thành token
        $token = JWTAuth::encode($payload)->get();
        return $token;
    }
    public function login(Request $request){
        if(!empty($request->cookie('token')))
        {
            $jwt = $this->decodeJWT($request->cookie('token'));
            $user = User::find($jwt['sub']);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
                'data' => ['fullname' => $user->fullname]
            ]);
        }
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $payload = ['user_id' => Auth::id()];
        $jwt = $this->encodeJWT($payload);
        $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
        return response()->json([
            'message' => 'Thành công',
            'status' => 200,
            'data' => ['fullname' => Auth::user()->fullname]
        ])->cookie($cookie);
    }
    public function logout(){
        return response()->json([
            'message' => 'Đăng xuất thành công',
            'status' => 200,
        ])->withCookie(cookie()->forget('token'));
    }
    public function loginWithGoogle(){
        // return response()->json([
        //     'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()
        // ]);
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }
    public function loginWithGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('email', $googleUser->getEmail())->first();
        if ($user->count() == 0) 
         {
            $userLog = User::create(['email' => $googleUser->getEmail(),'fullname' => $googleUser->getName(),'username' => $googleUser->getNickname()]);
            $payload = ['user_id' => $userLog->id];
            $jwt = $this->encodeJWT($payload);
            $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
                'data' => ['fullname' => $userLog->fullname]
            ])->cookie($cookie);
            
         }
         else
         {
            $payload = ['user_id' => $user->id];
            $jwt = $this->encodeJWT($payload);
            $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
                'data' => ['fullname' => $user->fullname]
            ])->cookie($cookie);
         }
    }
}
