<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NewSignupRequest;
use App\Http\Controllers\ApiController;
use App\Models\User;

class UserController extends ApiController
{
    
	public function getAllUsers() {
		
	  $users =User::get(); 
      return  $this->successResponse($users);
    }

    public function createUser(NewSignupRequest $request) {
      
		$payload = $request->all();
		
        try {           
            // create new user account for this first user
            $user = new User();            
            $user->name 		 = $payload['name'];
            $user->email 		 = $payload['email'];
            $user->password 	 = bcrypt($payload['password']);                     
            $user->role_id 	     = $payload['role'];        
            $user->save();
			
		return  $this->successResponse($user,'Success');
          
            
        } catch (Exception $e) {

           return $this->notFoundErrorResponse($this->has_errors, 404);
            
        }
	 
      return  $this->successResponse($users);
    }

    public function getUser($id) {
      
	  $user = User::find($id);
	  
	   if (! $user) {

            return $this->notFoundErrorResponse('User not found', 401);

        }
      return  $this->successResponse($user);
    }

    public function updateUser(Request $request, $id) {
      
	  $users = array();
      return  $this->successResponse($users);
    }

    public function deleteUser ($id) {
      $users = array();
      return  $this->successResponse($users);
    }

}
