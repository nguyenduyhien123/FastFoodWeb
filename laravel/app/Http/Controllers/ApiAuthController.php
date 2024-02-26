<?php

namespace App\Http\Controllers;

use App\Events\UserRegisterEvent;
use App\Events\UserResetPasswordEvent;
use App\Http\Requests\AccountChangePasswordRequest;
use App\Http\Requests\AccountResetPasswordRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\ResetPasswordSetPasswordRequest;
use App\Http\Requests\ResetPasswordVerifyEmailRequest;
use App\Models\PasswordResetToken;
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
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

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
            throw new HttpResponseException(response()->json(['errors' => 'Token has expired'], 422));
        } catch (TokenInvalidException $e) {
            // Xử lý khi token không hợp lệ
            // throw $e;
            // throw new Exception("Lỗi khi giải mã JWT: ");
            throw new HttpResponseException(response()->json(['errors' => 'Invalid Token'], 422));
            // return response()->json(['error' => 'Invalid token'], 401);
        } catch (Exception $e) {
            // Xử lý các lỗi khác nếu cần thiết
            throw new HttpResponseException(response()->json(['errors' => 'Lỗi' . $e->getMessage()], 422));
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
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Tên đăng nhập hoặc mật khẩu không chính xác !!!'], 401);
        }
        $payload = ['user_id' => Auth::id(), 'description' => 'authencation', 'exp' => Carbon::now()->addMinutes(env('TOKEN_AUTH_LIFETIME'))->timestamp];
        $jwt = $this->encodeJWT($payload);
        $cookie =   cookie('token', $jwt, env('TOKEN_AUTH_LIFETIME'), '/', 'localhost', false, true, false);
        return response()->json([
            'message' => 'Thành công',
            'status' => 200,
<<<<<<< HEAD
            'data' => ['lastname' => Auth::user()->lastname, 'verify_account' => Auth::user()->email_verified_at ? true : false, 'id' => Auth::id(), 'avatar' => Auth::user()->avatar]
=======
            'data' => ['lastname' => Auth::user()->lastname, 'verify_account' => Auth::user()->email_verified_at ? true : false, 'id' => Auth::id(), 'avatar' => Auth::user()->avatar, 'roleName' => Auth::user()->role->name , 'roleId' => Auth::user()->role->id]
>>>>>>> master
        ])->cookie($cookie);
    }
    public function loginWithToken(Request $request)
    {
        $user = $request->user;
        return response()->json([
            'message' => 'Đăng nhập thành công',
            'status' => 200,
<<<<<<< HEAD
            'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address, 'roleName' => $user->role->name]
=======
            'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address, 'roleName' => $user->role->name, 'roleId' => $user->role->id]
>>>>>>> master
        ]);
    }
    public function logout()
    {
        return response()->json([
            'message' => 'Đăng xuất thành công',
            'status' => 200,
        ])->withCookie(cookie()->forget('token'));
    }
    public function loginWithGoogle()
    {
        // return response()->json([
        //     'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()
        // ]);
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }
    public function loginWithGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('email', $googleUser->getEmail())->first();
        if (empty($user)) {
            $userLog = User::create(['email' => $googleUser->getEmail(), 'lastname' => $googleUser->getName(), 'username' => $googleUser->getNickname(), 'avatar' => $googleUser->getAvatar(), 'role_id' => 2]);
            $userLog->email_verified_at = Carbon::now();
            $userLog->save();
            $payload = ['user_id' => $userLog->id, 'description' => 'authencation', 'exp' => Carbon::now()->addMinutes(env('TOKEN_AUTH_LIFETIME'))->timestamp];
            $jwt = $this->encodeJWT($payload);
            $cookie =   cookie('token', $jwt, env('TOKEN_AUTH_LIFETIME'), '/', 'localhost', false, true, false);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
                'data' => ['firstname' => $userLog->firstname, 'lastname' => $userLog->lastname, 'verify_account' => $userLog->email_verified_at ? true : false, 'avatar' => $userLog->avatar, 'id' => $userLog->id, 'address' => $userLog->address, 'roleName' => $userLog->role->name]
            ])->cookie($cookie);
        } else {
            $payload = ['user_id' => $user->id];
            $jwt = $this->encodeJWT($payload);
            $cookie =   cookie('token', $jwt, env('TOKEN_AUTH_LIFETIME'), '/', 'localhost', false, true, false);
            return response()->json([
                'message' => 'Thành công',
                'status' => 200,
<<<<<<< HEAD
                'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address,  'roleName' => $user->role->name]
=======
                'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address,  'roleName' => $user->role->name, 'roleId' => $user->role->id]
>>>>>>> master
            ])->cookie($cookie);
        }
    }
    public function register(RegisterUserRequest $request)
    {
        $infoUser = $request->only(['email', 'password', 'phone', 'firstname', 'lastname']);
        $infoUser['role_id'] = 2;
        $user = User::create($infoUser);
        $payload = ['user_id' => $user->id, 'exp' => Carbon::now()->addDays(1), 'description' => 'verify-account'];
        $jwt = $this->encodeJWT($payload);
        $link = route('verify-account', ['token' => $jwt]);
        $infoMail = [
            'to' => $user->email,
            'from' => env('MAIL_FROM_ADDRESS'),
            'title' => 'Xác thực tài khoản trên hệ thống bán thức ăn nhanh',
            'view' => 'email.verifyAccount',
            'lastname' => $user->lastname,
            'link' => $link,
            'link_expired' => Carbon::now()->addDays(1)->format('d-m-Y H:m:s')
        ];
        try {
            event(new UserRegisterEvent($infoMail));
        } catch (Exception $e) {
            return $e;
        }
        $payload = ['user_id' => $user->id, 'description' => 'authencation', 'exp' => Carbon::now()->addMinutes(env('TOKEN_AUTH_LIFETIME'))->timestamp];
        $jwt = $this->encodeJWT($payload);
        $cookie =   cookie('token', $jwt, env('TOKEN_AUTH_LIFETIME'), '/', 'localhost', false, true, false);
        return response()->json([
            'message' => 'Đăng ký Thành công',
            'description' => 'Vui lòng mở hộp thư trong email để xác thực tài khoản !',
            'status' => 200,
<<<<<<< HEAD
            'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address, 'roleName' => $user->role->name]
=======
            'data' => ['firstname' => $user->firstname, 'lastname' => $user->lastname, 'verify_account' => $user->email_verified_at ? true : false, 'avatar' => $user->avatar, 'id' => $user->id, 'address' => $user->address, 'roleName' => $user->role->name, 'roleId' => $user->role->id]
>>>>>>> master
        ])->cookie($cookie);
    }
    public function verifyAccount(Request $request)
    {
        try {
            if (empty($request->query('token'))) {
                return response()->json(['message' => 'Link không hợp lệ'], 404);
            }
            $token = $request->query('token');
            $info = $this->decodeJWT($token);
            $user = User::find($info['sub']);
            if ($user->email_verified_at === null) {
                $user->email_verified_at = Carbon::now();
                $user->save();
                $newUrl = 'http://localhost:3000/';

                return response()
                    ->json(['message' => 'Xác thực tài khoản thành công', 'description' => 'Chuyển hướng tới trang chủ sau 3s'], 200)
                    ->header('Refresh', '3;url=' . $newUrl);
            }
            return response()->json(['message' => 'Liên kết đã hết hiệu lực'], 200);
            // Xử lý kết quả trả về (nếu cần)
        } catch (Exception $e) {
            throw $e;
        }
    }
    public function changePassword(AccountChangePasswordRequest $request)
    {
        $user = $request->user;
        if (Hash::check($request->password_old, $user->password)) {
            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json(['message' => 'Đổi mật khẩu thành công']);
        }
        return response()->json(['message' => 'Mật khẩu cũ không trùng khớp'], 422);
    }
    // gửi email xác thực
    public function resetPassword(AccountResetPasswordRequest $request)
    {
        // Nếu có mã bảo mật tức là đang thực hiện đặt lại mật khẩu(sửa mật khẩu)
        if ($request->secure_code && $request->email) {
            $prt = PasswordResetToken::where('email', $request->email)->where('token', $request->secure_code)->first();
            if (!empty($prt)) {
                return response()->json(['message' => 'Đặt lại mật khẩu thành công']);
            }
            return response()->json(['message' => 'Liên kết không đúng hoặc đã hết hạn']);
        }
        // Còn không tức là gửi lại email đặt lại mật khẩu
        else {
            $email = $request->email;
            // Kiểm tra đã tồn tại đặt lại mật khẩu và nó đã hết hạn chưa
            $prt = PasswordResetToken::where('email', $email)->first();
            // So sánh thời gian
            if (!empty($prt)) {
                $timePrt = Carbon::parse($prt->expires_at);
                $timeNow = Carbon::now();
                $diff = $timeNow->diffInMinutes($timePrt, false);
                if ($diff >= 3) {
                    $diffTime = $timeNow->diffInSeconds($timePrt) - 180;
                    return response()->json(['message' => "Đặt lại mật khẩu sau $diffTime giây nữa"]);
                } else if ($diff < 0) {
                    $prt->delete();
                }
            }
            // Nếu như mà không tồn tại hoặc là hết hạn
            // Tạo secure_code(mã bảo mật)
            $string = $email . Str::random(10) . Carbon::now();
            $secure_code = hash('sha256', $string);
            $prt2 = PasswordResetToken::create([
                'email' => $email,
                'token' => $secure_code,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addMinutes(60),
            ]);
            $linkResetPassword = "http://localhost:3000/accounts/reset-password/set-password?email=$email&secure_code=$secure_code";
            $link_expired = Carbon::parse($prt2->expires_at)->format('d-m-Y H:i:s');
            // Thông tin gửi mail đặt lại mật khẩu
            $infoMail = [
                'to' => $email,
                'from' => env('MAIL_FROM_ADDRESS'),
                'title' => 'Đặt lại mật khẩu trên hệ thống bán thức ăn nhanh',
                'view' => 'email.resetPassword',
                'link' => $linkResetPassword,
                'link_expired' =>  $link_expired,
                'email' => $email
            ];
            // Phát sinh sự kiện đặt lại mật khẩu
            try {
                event(new UserResetPasswordEvent($infoMail));
            } catch (Exception $e) {
                return $e;
            }
            return response()->json(['message' => 'Email đặt lại mật khẩu đã được gửi thành công', 'description' => 'Vui lòng kiểm tra hộp thư đến hoặc thư mục thư rác / thư rác để biết email đặt lại mật khẩu của bạn. Nếu bạn không nhận được email này, vui lòng đăng ký một tài khoản trực tuyến với chúng tôi.']);
        }
    }
    // thực hiện đặt lại mật khẩu
    // kiểm tra token đặt lại mật khẩu
    public function checkTokenResetPassword(Request $request)
    {
        $prt = PasswordResetToken::where('email', $request->email)->where('token', $request->secure_code)->where('expires_at', '>', Carbon::now())->first();
        if (!empty($prt)) {
            return response()->json(['message' => 'Valid token']);
        }
        return response()->json(['message' => 'Liên kết không đúng hoặc đã hết hạn'], 403);
    }
    public function resetPasswordSetPassword(ResetPasswordSetPasswordRequest $request)
    {
        $prt = PasswordResetToken::where('email', $request->email)->where('token', $request->secure_code)->where('expires_at', '>', Carbon::now())->first();
        if (!empty($prt)) {
            $user = User::where('email', $request->email)->first();
            if (!empty($user)) {
                $user->password = Hash::make($request->password);
                $user->save();
                $prt->delete();
                return response()->json(['message' => 'Đặt lại mật khẩu thành công']);
            }
        }
        return response()->json(['message' => 'Liên kết không đúng hoặc đã hết hạn'], 403);
    }
    public function resetPasswordVerifyEmail(ResetPasswordVerifyEmailRequest $request)
    {
            $email = $request->email;
            // Kiểm tra đã tồn tại đặt lại mật khẩu và nó đã hết hạn chưa
            $prt = PasswordResetToken::where('email', $email)->first();
            // So sánh thời gian
            if (!empty($prt)) {
                $timePrt = Carbon::parse($prt->expires_at);
                $timeNow = Carbon::now();
                $diff = $timeNow->diffInMinutes($timePrt, false);
                if ($diff >= 3) {
                    $diffTime = $timeNow->diffInSeconds($timePrt) - 180;
                    return response()->json(['message' => "Đặt lại mật khẩu sau $diffTime giây nữa"]);
                } else if ($diff < 0) {
                    $prt->delete();
                }
            }
            // Nếu như mà không tồn tại hoặc là hết hạn
            // Tạo secure_code(mã bảo mật)
            $string = $email . Str::random(10) . Carbon::now();
            $secure_code = hash('sha256', $string);
            $prt2 = PasswordResetToken::create([
                'email' => $email,
                'token' => $secure_code,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'expires_at' => Carbon::now()->addMinutes(60),
            ]);
            $linkResetPassword = "http://localhost:3000/accounts/reset-password/set-password?email=$email&secure_code=$secure_code";
            $link_expired = Carbon::parse($prt2->expires_at)->format('d-m-Y H:i:s');
            // Thông tin gửi mail đặt lại mật khẩu
            $infoMail = [
                'to' => $email,
                'from' => env('MAIL_FROM_ADDRESS'),
                'title' => 'Đặt lại mật khẩu trên hệ thống bán thức ăn nhanh',
                'view' => 'email.resetPassword',
                'link' => $linkResetPassword,
                'link_expired' =>  $link_expired,
                'email' => $email
            ];
            // Phát sinh sự kiện đặt lại mật khẩu
            try {
                event(new UserResetPasswordEvent($infoMail));
            } catch (Exception $e) {
                return $e;
            }
            return response()->json(['message' => 'Email đặt lại mật khẩu đã được gửi thành công', 'description' => 'Vui lòng kiểm tra hộp thư đến hoặc thư mục thư rác / thư rác để biết email đặt lại mật khẩu của bạn. Nếu bạn không nhận được email này, vui lòng đăng ký một tài khoản trực tuyến với chúng tôi.']);
    }
}
