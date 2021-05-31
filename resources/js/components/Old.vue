<template>
    <div>
       
        
		<div v-if="role==1">
 <router-link :to="{name: 'add'}" class="btn btn-primary">Create Product
                        </router-link>
						<br/>
						</div>
						<br/><br/>
		<div v-if="role==1">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th @click="sort('id')">ID</th>
                
                <th @click="sort('product_description')">Description</th>
                <th @click="sort('barcode')"> Barcode</th>
                <th @click="sort('retail_price')">Retail Price</th>
                <th @click="sort('cost')">Cost</th>
                <th @click="sort('stock')">Stock</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in sortedProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.product_description }}</td>
                <td>{{ product.barcode }}</td>
                <td>{{ product.retail_price }}</td>
                <td>{{ product.cost }}</td>
                <td>{{ product.stock }}</td>
               
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'edit', params: { id: product.id }}" class="btn btn-primary">Edit
                        </router-link>
                        <button class="btn btn-danger" @click="deletePost(product.id)">Delete</button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
		
		<button @click="prevPage">Previous</button> 
  <button @click="nextPage">Next</button>
		</div>
		
		
		<div v-if="role==2">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                
                <th>Description</th>
                <th>Barcode</th>
                <th>Retail Price</th>
                <th>Cost</th>
                <th>Stock</th>
                
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in sortedProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.product_description }}</td>
                <td>{{ product.barcode }}</td>
                <td>{{ product.retail_price }}</td>
                <td>{{ product.cost }}</td>
                <td>{{ product.stock }}</td>
              
            </tr>
            </tbody>
        </table>
		<button @click="prevPage">Previous</button> 
  <button @click="nextPage">Next</button>
		</div>
    </div>
</template>
 <style>td, th {
  padding: 5px;
}

th {
  cursor:pointer;
}
 </style>
<script>
let token = window.localStorage.getItem('token');
let role_id = window.localStorage.getItem('role_id');

import Vuetable from 'vuetable-2'

    export default {
	components: {
    Vuetable
  },
        data() {
            return {
                products: [],
				 currentSort:'name',
				currentSortDir:'asc',
				pageSize:300,
				currentPage:1
            }
        },
		computed: {

            token: function() {
                return vueStore.state.auth.token;
            },
			 role: function() {
                return role_id;
            },
			sortedProducts:function() {
				  return this.products.sort((a,b) => {
					let modifier = 1;
					if(this.currentSortDir === 'desc') modifier = -1;
					if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
					if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
					return 0;
				  }).filter((row, index) => {
					let start = (this.currentPage-1)*this.pageSize;
					let end = this.currentPage*this.pageSize;
					if(index >= start && index < end) return true;
				  });
				}

        },
        created() {
		
            this.axios
                .get('/api/products',{
				  headers: {
					'Authorization': 'Bearer '+token
				  }
				})
                .then(response => {
                    this.products = response.data.data;
                });
        },
        methods: {
            deletePost(id) {
			
			
                var thisComponent = this;
			
                this.$swal({
					 title: 'Are you sure?',
					 text: "You won't be able to revert this!",
					 type: 'warning',
					 showCancelButton: true,
					 confirmButtonColor: '#3085d6',
					 cancelButtonColor: '#d33',
					 confirmButtonText: 'Yes, delete it!',
					 cancelButtonText: 'No, cancel!',
					 buttonsStyling: true
				  }).then(function (isConfirm) {
					 if(isConfirm.value === true) {
					 
					thisComponent.confirmdeletePost(id);
					 }
				  });
            },
			
			confirmdeletePost(id) {
			
			
			
                this.axios
                    .delete('/api/products/'+id,{
					  headers: {
						'Authorization': 'Bearer '+token 
					  }
					})
                    .then(response => {
					this.$swal('Product Deleted Successfully !!!');
                        let i = this.products.map(item => item.id).indexOf(id); // find index of your object
                        this.products.splice(i, 1);
						
                    });
					
					
            },
			
			
			 sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.products.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
        }
    }
</script>