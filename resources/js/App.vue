<template>
    <div class="container">
       
 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Home</router-link>
					  <span  v-if="loggedInUser" class="nav-item nav-link" v-on:click="logout" style="cursor:pointer">Logout</span>

				
                </div>
            </div>
        </nav>
        <br/>
        <router-view></router-view>
    </div>
</template>
 
<script>
let expiration = window.localStorage.getItem('expiration');
//let loggedIn = window.localStorage.getItem('loggedIn');
//let loggedIn=localStorage.getItem("loggedIn") != null ? localStorage.getItem("loggedIn"): null;
let loggedIn=localStorage.getItem("loggedIn") != null || localStorage.getItem("loggedIn") != ''  ? localStorage.getItem("loggedIn"): null;

let token = window.localStorage.getItem('token');

    export default {
	computed: {

            
			 loggedInUser: function() {
                return loggedIn;
            }

        },
			mounted () {
			  //store.dispatch('refresh_token')
			  this.refreshtoekn();
			},
			
			methods: {
				refreshtoekn() {
						let start = Date.now();
						
						if(start > expiration){
							//window.localStorage.clear();
							//this.$router.push({name: 'login'});
						
						}
				},
				
				 logout() {
 
                this.axios
                    .post('/api/logout', {},{
					  headers: {
						'Authorization': 'Bearer '+token
					  }
					})
                   .then(function(response) {
					
                        window.localStorage.clear();
						 window.location.href = '/login';
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.loading = false)
            }
			}
	}
</script>