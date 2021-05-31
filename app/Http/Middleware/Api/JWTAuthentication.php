<?php

namespace App\Http\Middleware\Api;

use Closure;
use Exception;
use JWTAuth;
use App\Helpers\RESTAPIHelper;
use App\Http\Traits\JWTUserTrait;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JWTAuthentication {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTUserTrait::getUserInstance($request->input('_token'));

            if ( !$user ) {
                return RESTAPIHelper::response( 'Your login session has expired or the user logged in on another device', false, 'invalid_token' );
            }
        }
        catch (Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return RESTAPIHelper::response( 'Your login session has expired or the user logged in on another device', false, 'invalid_token' );
            }
            if ($e instanceof TokenExpiredException) {
                return RESTAPIHelper::response( 'Your session has been expired, please log-in again.', false, 'invalid_token' );
            }
            if ( null === $request->get('_token') ) {
                return RESTAPIHelper::response( 'Session parameter not found.', false, 'invalid_token' );
            }
            return RESTAPIHelper::response( 'Something went wrong.', false );
        }

        return $next($request);
    }
}
