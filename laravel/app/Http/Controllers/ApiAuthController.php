<?php

namespace App\Http\Controllers;

use App\Events\UserRegisterEvent;
use App\Http\Requests\RegisterUserRequest;
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
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            throw new HttpResponseException(response()->json(['errors' =>'Token has expired'], 422));
        } catch (TokenInvalidException $e) {
            // Xử lý khi token không hợp lệ
            // throw $e;
            // throw new Exception("Lỗi khi giải mã JWT: ");
            throw new HttpResponseException(response()->json(['errors' =>'Invalid Token'], 422));
           // return response()->json(['error' => 'Invalid token'], 401);
        } catch (Exception $e) {
            // Xử lý các lỗi khác nếu cần thiết
            throw new HttpResponseException(response()->json(['errors' =>'Lỗi'. $e->getMessage()], 422));
            // return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
    public function encodeJWT($payload)
    {
        // Tạo một mảng chứa thông tin payload
        $payloadArray = [
            'iat' => Carbon::now()->timestamp,
            'exp' => $payload['exp'] ?? Carbon::now()->addHour()->timestamp,
            'nbf' => Carbon::now()->timestamp,
            'jti' => uniqid(),
            'sub' => $payload['user_id'],
            'description' => $payload['description'] ??  'authencation'
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
                'message' => 'Đăng nhập thành công',
                'status' => 200,
                'data' => ['lastname' => $user->lastname,'verify_account' => $user->email_verified_at ? true: false]
            ]);
        }
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Tên đăng nhập hoặc mật khẩu không chính xác !!!'], 401);
        }
        $payload = ['user_id' => Auth::id(),'description' => 'Authencation'];
        $jwt = $this->encodeJWT($payload);
        $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
        return response()->json([
            'message' => 'Thành công',
            'status' => 200,
            'data' => ['lastname' => Auth::user()->lastname,'verify_account' => Auth::user()->email_verified_at ? true : false]
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
        if (empty($user)) 
         {
            $userLog = User::create(['email' => $googleUser->getEmail(),'lastname' => $googleUser->getName(),'username' => $googleUser->getNickname()]);
            $userLog->email_verified_at = Carbon::now();
            $userLog->save();
            $payload = ['user_id' => $userLog->id];
            $jwt = $this->encodeJWT($payload);
            $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
                'data' => ['lastname' => $userLog->lastname,'verify_account' => $userLog->email_verified_at ? true : false]
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
                'data' => ['lastname' => $user->lastname]
            ])->cookie($cookie);
         }
    }
    public function register(RegisterUserRequest $request){
        $infoUser = $request->only(['email', 'password','phone','firstname','lastname']);
        $user = User::create($infoUser);
        $payload = ['user_id' => $user->id,'exp' => Carbon::now()->addDays(1),'description' => 'verify-account'];
        $jwt = $this->encodeJWT($payload);
        $link = route('verify-account',['token' => $jwt]);
        $infoMail = [
            'to' => $user->email,
            'from' => env('MAIL_FROM_ADDRESS'),
            'title' => 'Xác thực tài khoản trên hệ thống bán thức ăn nhanh',
            'view' => 'email.verifyAccount',
            'lastname' => $user->lastname,
            'link' => $link,
            'link_expired' => Carbon::now()->addDays(1)->format('d-m-Y H:m:s')
        ];
        try
        {
            event(new UserRegisterEvent($infoMail));

        }
        catch(Exception $e)
        {
            return $e;
        }
        $payload = ['user_id' => $user->id,'description' => 'Authencation'];
        $jwt = $this->encodeJWT($payload);
        $cookie =   cookie('token', $jwt, 60 , '/', 'localhost', false, true, false);
        return response()->json([
            'message' => 'Đăng ký Thành công',
            'description' => 'Vui lòng mở hộp thư trong email để xác thực tài khoản !',
            'status' => 200,
            'data' => ['lastname' => $user->lastname,'verify_account' => $user->email_verified_at ? true : false]
        ])->cookie($cookie);
    }
    public function verifyAccount(Request $request){
        try {
            if(empty($request->query('token')))
            {
                return response()->json(['message' => 'Link không hợp lệ'], 404);
            }
            $token = $request->query('token');
            $info = $this->decodeJWT($token);
            $user = User::find($info['sub']);
            if($user->email_verified_at === null)
            {
                $user->email_verified_at = Carbon::now();
                $user->save();
                return response()->json(['message' => 'Xác thực tài khoản thành công'], 200);
            }
            return response()->json(['message' => 'Tài khoản đã được xác thực'], 200);
            // Xử lý kết quả trả về (nếu cần)
        } catch (Exception $e) {
            throw $e;
        }
    }
}
