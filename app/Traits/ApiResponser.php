<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponser{

    protected function successResponse($data, $message = null, $code = 200)
	{
		return response()->json([
			'status'=> 'Success', 
			'message' => 'Success', 
			'errors' => null,
			'data' => $data
		], $code);
	}

	protected function errorResponse($message = null, $code)
	{
		return response()->json([
			'status'=>'Error',
			'message' => null,
			'errors' => $message,
			'data' => null
		], $code);
	}
	
	protected function notFoundErrorResponse($message = 'Unable to process request', $code)
	{
		return response()->json([
			'status'=>'Error',
			'message' =>null,
			'errors' => [
                        $message
                    ],
			'data' => null
		], $code);
	}

}
