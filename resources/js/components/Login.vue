<template>
    <div>
        <h3 >Login</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="loginUser">
                   
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" v-model="login.email"  required>
                    </div>
					 <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="login.password" required>
                    </div>
					<br/>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
                login: {}
            }
        },
		 computed: {

            role: function() {
                return vueStore.state.role_id;
            }

        },
        methods: {
            loginUser() {
 
                this.axios
                    .post('/api/login', this.login)
                    .then(function(response) {
						let authDetails =response.data ;
                        vueStore.commit('authIsLoggedIn', true);
						window.localStorage.setItem("loggedIn", true);
						
						 vueStore.dispatch('authenticate',{
							  token: authDetails.access_token,
							  expiration: authDetails.expires_in + Date.now(),
							  userDetails: authDetails.userDetails
						  })
						  						  
						   window.location.href = '/';
                    })
                    .catch(error => {
								//window.localStorage.clear();
						    commit("setError", error.response.data.errors);
							
				})
                    .finally(() => this.loading = false)
            }
        }
    }
</script>