<template>
    <div>
        <h3 >Add Product</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addPost">
                   
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
                    <button type="submit" class="btn btn-primary">Add Product</button>
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
                post: {},
				
            }
        },
        methods: {
            addPost() {
 
                this.axios
                    .post('/api/products', this.post,{
					  headers: {
						'Authorization': 'Bearer '+token
					  }
					})
                    .then(response => {
					this.$swal('Product added Successfully !!!');
                        this.$router.push({name: 'home'})
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>