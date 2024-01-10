<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Payload;
use Tymon\JWTAuth\Token;
use Exception;
use Illuminate\Support\Facades\Auth;

class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $description): Response
    {
        if(!empty($request->cookie('token')) && $description === 'authencation' )
        {
            $jwt = $this->decodeJWT($request->cookie('token'));
            if($jwt['description'] === $description)
            {
                $user = User::find($jwt['sub']);
                if(!empty($user))
                {
                    // Auth::loginUsingId($user->id);
                    $request->merge(['user' => $user]);
                    return $next($request);
                }
            }
        }
        else if(!empty($request->token) && $description === 'verify-account')
        {
            $jwt = $this->decodeJWT($request->token);
            if($jwt['description'] === $description)
            {
                $user = User::find($jwt['sub']);
                if(!empty($user))
                {
                    // Auth::loginUsingId($user->id);
                    $request->merge(['user' => $user]);
                    return $next($request);
                }
            }
        }
        return response()->json(['message' => 'Unauthorized'], 403);
    }
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
}
