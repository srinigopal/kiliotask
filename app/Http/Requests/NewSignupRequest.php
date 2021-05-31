<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NewSignupRequest extends BaseFormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required',
            'role' => 'required',           
            'email' => 'required|email|unique:users,email',
			'password' => 'required',
            'confirmPassword' => 'required',
            'password' => 'min:3|required_with:confirmPassword'
            
        ];
    }

   
   

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'errors' => $validator->errors(),
            'data' => null
        ], 422));
    }

}