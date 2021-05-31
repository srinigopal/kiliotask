<template>
    <div>
        <h3 >Edit Product</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updatePost">
                   
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" required class="form-control" v-model="post.product_description">
                    </div>
					 <div class="form-group">
                        <label>Barcode</label>
                        <input type="text" required class="form-control" v-model="post.barcode">
                    </div>
					 <div class="form-group">
                        <label>Retail Price</label>
                        <input type="number" required class="form-control" v-model="post.retail_price">
                    </div>
					<div class="form-group">
                        <label>Cost</label>
                        <input type="number" required class="form-control" v-model="post.cost">
                    </div>
					<div class="form-group">
                        <label>Stock</label>
                        <input type="number" required class="form-control" v-model="post.stock">
                    </div>
					<br/>
                    <button type="submit" class="btn btn-primary">Update Product</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script>
let token = window.localStorage.getItem('token');
    export default {
        data() {
            return {
                post: {}
            }
        },
        created() {
            this.axios
                .get('/api/products/'+this.$route.params.id,{
				  headers: {
					'Authorization': 'Bearer '+token 
				  }
				})
                .then((response) => {
                    this.post = response.data.data;
                    // console.log(response.data);
                });
        },
        methods: {
            updatePost() {
                this.axios
                    .put('/api/products/'+this.$route.params.id, this.post,{
					  headers: {
						'Authorization': 'Bearer '+token
					  }
					})
                    .then((response) => {
					this.$swal('Product updated Successfully !!!');
                        this.$router.push({name: 'home'});
                    });
            }
        }
    }
</script>