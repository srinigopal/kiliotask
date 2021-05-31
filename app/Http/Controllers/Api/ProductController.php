<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateProductRequest;
use App\Http\Controllers\ApiController;
use App\Models\Product;

class ProductController extends ApiController
{
    
	public function getAllProducts() {
		
	  $products =Product::get(); 
      return  $this->successResponse($products);
    }

    public function createProduct(CreateProductRequest $request) {
      
		$payload = $request->all();
		
        try {           
           
            $product = new Product();            
            $product->product_description 		 = $payload['product_description'];
            $product->barcode 					 = $payload['barcode'];
            $product->retail_price 				 = $payload['retail_price'];
            $product->cost 		 				 = $payload['cost'];
            $product->stock 		 			 = $payload['stock'];
                
            $product->save();
			
		return  $this->successResponse($product,'Success');
          
            
        } catch (Exception $e) {

           return $this->notFoundErrorResponse($this->has_errors, 404);
            
        }
	 
      return  $this->successResponse($users);
    }

    public function getProduct($id) {
      
	  $product = Product::find($id);
	  
	   if (! $product) {

            return $this->notFoundErrorResponse('Product not found', 401);

        }
      return  $this->successResponse($product);
    }

    public function updateProduct(CreateProductRequest $request, $id) {
      
	  $product = Product::find($id);
	  
	   if (! $product) {

            return $this->notFoundErrorResponse('Product not found', 401);

        }    $payload = $request->all();
		
			$product->product_description 		 = $payload['product_description'];
            $product->barcode 					 = $payload['barcode'];
            $product->retail_price 				 = $payload['retail_price'];
            $product->cost 		 				 = $payload['cost'];
            $product->stock 		 			 = $payload['stock'];
                
            $product->save();
      return  $this->successResponse($product);
    }

    public function deleteProduct ($id) {
      
	  
	  $product = Product::find($id)->delete();
	  
      return  $this->successResponse('deleted');
    }

}
