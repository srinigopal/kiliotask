<template>
	<div id="app" class="ui container">
	
	<div v-if="role==1">
	<router-link :to="{name: 'add'}" class="btn btn-primary">Create Product
                        </router-link>
						<br/>
						
	    <vue-good-table
			  :columns="columns"
			  :rows="data"
			  :search-options="{
			enabled: true}"
			:pagination-options="{
			enabled: true
		  }">
				<template slot="table-row" slot-scope="props">
				<span v-if="props.column.field == 'id'">
			  <router-link :to="{name: 'edit', params: { id: props.row.id }}" class="btn btn-primary">Edit
								</router-link>
						 <button class="btn btn-danger" @click="deletePost(props.row.id)">Delete</button>
							
						</button>
			</span>
   
		</template>
		</vue-good-table> 	
	</div>
	
	<div v-if="role==2">
	    <vue-good-table
			  :columns="columns2"
			  :rows="data"
			  :search-options="{
			enabled: true}"
			:pagination-options="{
			enabled: true
		  }">
				
		</vue-good-table> 	
	</div>
	
	</div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
button.ui.button {
  padding: 8px 3px 8px 10px;
	margin-top: 1px;
	margin-bottom: 1px;
}
</style>
<script>

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
let token = window.localStorage.getItem('token');
let role_id = window.localStorage.getItem('role_id');
export default {
  name: "app",

  components: {
   VueGoodTable
  },

  data() {
    return {
        columns: [
        {
          label: 'Name',
          field: 'product_description',
        },
		{
          label: 'Barcode',
          field: 'barcode',
        },
		{
          label: 'Retail Price',
          field: 'retail_price',
        },
		{
          label: 'Cost',
          field: 'cost',
        },
		{
          label: 'Stock',
          field: 'stock',
        },
		{
          label: 'Action',
          field: 'id',
        }
      ],
		columns2: [
        {
          label: 'Name',
          field: 'product_description',
        },
		{
          label: 'Barcode',
          field: 'barcode',
        },
		{
          label: 'Retail Price',
          field: 'retail_price',
        },
		{
          label: 'Cost',
          field: 'cost',
        },
		{
          label: 'Stock',
          field: 'stock',
        }
      ],
      data: []
    };
  },

  
computed: {

            token: function() {
                return vueStore.state.auth.token;
            },
			 role: function() {
                return role_id;
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
                    this.data = response.data.data;
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
                        let i = this.data.map(item => item.id).indexOf(id); // find index of your object
                        this.data.splice(i, 1);
						
                    });
					
					
            }
	}		
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
button.ui.button {
  padding: 8px 3px 8px 10px;
	margin-top: 1px;
	margin-bottom: 1px;
}
</style>
