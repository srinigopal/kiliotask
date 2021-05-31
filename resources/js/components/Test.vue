<template>
	<div id="app" class="ui container">
		
	<div v-if="role==1">

	<vuetable ref="vuetable"
			:api-mode="false"
			:fields="fields"
      :per-page="perPage"
			:data-manager="dataManager"
      pagination-path="pagination"
	    @vuetable:pagination-data="onPaginationData"
		>
			<div slot="actions" slot-scope="props">
			<router-link :to="{name: 'edit', params: { id: props.rowData.id }}" class="btn btn-primary">Edit
                        </router-link>
				 <button class="btn btn-danger" @click="deletePost(props.rowData.id)">Delete</button>
					
				</button>
			</div>
		</vuetable>
		</div>
		
		<div v-if="role==2">

	<vuetable ref="vuetable"
			:api-mode="false"
			:fields="fields2"
      :per-page="perPage"
			:data-manager="dataManager"
      pagination-path="pagination"
	    @vuetable:pagination-data="onPaginationData"
		>
			
		</vuetable>
		</div>
		
		
    <div style="padding-top:10px">
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
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
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import axios from "axios";
import _ from "lodash";
let token = window.localStorage.getItem('token');
let role_id = window.localStorage.getItem('role_id');
export default {
  name: "app",

  components: {
    Vuetable,
    VuetablePagination
  },

  data() {
    return {
      fields: [
	  
	  {
		name: 'product_description',
		title: '<span class="orange glyphicon glyphicon-user"></span> Description',
		sortField: 'product_description'
	  },
	   {
		name: 'id',
		title: '<span class="orange glyphicon glyphicon-user"></span> Description',
		sortField: 'id'
	  },
	  {
		name: 'barcode',
		title: '<span class="orange glyphicon glyphicon-user"></span> Barcode',
		sortField: 'barcode'
	  },
	  {
		name: 'retail_price',
		title: '<span class="orange glyphicon glyphicon-user"></span>Retail Price',
		sortField: 'retail_price'
	  },
	 {
		name: 'cost',
		title: '<span class="orange glyphicon glyphicon-user"></span>Cost',
		sortField: 'cost'
	  },
	  {
		name: 'stock',
		title: '<span class="orange glyphicon glyphicon-user"></span>Stock',
		sortField: 'stock'
	  },
  'actions'
	  ],
	  fields2: [
	  
	  {
		name: 'product_description',
		title: '<span class="orange glyphicon glyphicon-user"></span> Description',
		sortField: 'product_description'
	  },
	   {
		name: 'id',
		title: '<span class="orange glyphicon glyphicon-user"></span> Description',
		sortField: 'id'
	  },
	  {
		name: 'barcode',
		title: '<span class="orange glyphicon glyphicon-user"></span> Barcode',
		sortField: 'barcode'
	  },
	  {
		name: 'retail_price',
		title: '<span class="orange glyphicon glyphicon-user"></span>Retail Price',
		sortField: 'retail_price'
	  },
	 {
		name: 'cost',
		title: '<span class="orange glyphicon glyphicon-user"></span>Cost',
		sortField: 'cost'
	  },
	  {
		name: 'stock',
		title: '<span class="orange glyphicon glyphicon-user"></span>Stock',
		sortField: 'stock'
	  }
	  ],
      perPage: 40,
      data: []
    };
  },

  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
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
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log('pagination:', pagination)
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
	this.$router.push({name: 'edit'})
      console.log("slot actions: on-click", data.name);
    },
  
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
