<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api'    

], function ($router) {
	
    Route::post('login', 'Api\AuthController@login');
    Route::post('logout', 'Api\AuthController@logout');
    Route::post('refresh', 'Api\AuthController@refresh');
    Route::get('me', 'Api\AuthController@me');
	
		Route::group(['middleware' => 'auth:api'], function () {
	//users 
	
	Route::get('users', 'Api\UserController@getAllUsers');
	Route::get('users/{id}', 'Api\UserController@getUser');
	Route::post('users', 'Api\UserController@createUser');
	Route::put('users/{id}', 'Api\UserController@updateUser');
	Route::delete('users/{id}','Api\UserController@deleteUser');


	//products 
	
	Route::get('products', 'Api\ProductController@getAllProducts');
	Route::get('products/{id}', 'Api\ProductController@getProduct');
	Route::post('products', 'Api\ProductController@createProduct');
	Route::put('products/{id}', 'Api\ProductController@updateProduct');
	Route::delete('products/{id}','Api\ProductController@deleteProduct');
	});
});





