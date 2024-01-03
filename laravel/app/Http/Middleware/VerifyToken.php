<?php

namespace App\Http\Middleware;

use Closure;
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
class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!empty($request->cookie('token')))
        {
            $jwt = $this->decodeJWT($request->cookie('token'));
            return $next($request);
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
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            // Xử lý khi token không hợp lệ
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (Exception $e) {
            // Xử lý các lỗi khác nếu cần thiết
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
