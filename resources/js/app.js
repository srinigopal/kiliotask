require('./bootstrap');
import Vue from 'vue'

window.Vue = require('vue').default;

 /*import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)*/
import App from './App.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {routes} from './routes';
 import 'bootstrap/dist/css/bootstrap.css'
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);



// add Vuex store
    import Vuex from 'vuex';
	
    Vue.use(Vuex);
	//window.localStorage.clear();


    window.vueStore = new Vuex.Store({
        state: {
            auth: {
                isLoggedIn: false,
                token: null,
                expiration: null
            },
            configGetState: 'NO_ATTEMPT',
            route: null,
            userInfo: null,
            tokenDetails: null,
            role_id: null,
			
        },
        mutations: {
            authIsLoggedIn: function(state, payload) {
                state.auth.isLoggedIn = payload;
            },
			authTokenKey: function(state, payload) {
                state.auth.token = payload;
            },
            configGetState: function(state, payload) {
                state.configGetState = payload;
            },
           tokenDetailsUpdate: function(state, payload) {
                state.tokenDetails = payload;
            },
		   
            user: function(state, payload) {
                state.user = payload;
            },
			 authenticate(state, payload) {
				   
					state.auth.token = payload.token;
					state.auth.expiration = payload.expiration;
					localStorage.setItem('token', payload.token);
					localStorage.setItem('expiration', payload.expiration);
					
					state.role_id = payload.userDetails.role_id;
					state.userInfo = payload.userDetails;
					localStorage.setItem('role_id', payload.userDetails.role_id);
					localStorage.setItem('userInfo', payload.userDetails);
					
			}
        },
        actions: {
			
			
            getConfig(context) {

                //update config get state
                vueStore.commit('configGetState', 'ATTEMPTING');
				let token = window.localStorage.getItem('token');
                //get config
                axios.get('/api/me',{
				  headers: {
					'Authorization': 'Bearer '+token
				  }
				})
                    .then(function(response) {

                        vueStore.commit('configGetState', 'SUCCESS'); //update config get state

                        vueStore.commit('user', response.data? response.data : null); //mutate user state

                    })
                    .catch(function(response) {
                        vueStore.commit('configGetState', 'FAILED'); //TODO - redirect to some error page
                    });

            },
			getUserUpdate(context) {

                //update config get state
                 vueStore.commit('authIsLoggedIn', true);

                

            },
			authenticate: ({commit}, payload) => {
				commit('authenticate', payload)
				
			
			}
			
			
        }
    });


   let loggedIn=localStorage.getItem("loggedIn") != null || localStorage.getItem("loggedIn") != ''  ? localStorage.getItem("loggedIn"): null;

	//let loggedIn = window.localStorage.getItem('loggedIn');
    if (loggedIn ) {

        window.authIsLoggedIn = true;


    } else {

        window.authIsLoggedIn = false;

    }
	 if (authIsLoggedIn) {

        vueStore.commit('authIsLoggedIn', true);

        //set initial config for vueStore
       // vueStore.dispatch('getConfig');
        
    } else {

        vueStore.commit('authIsLoggedIn', false);

    }
	

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
	

 
const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
	
	
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (authIsLoggedIn) {
			
      next()
      return
    }
	
	if (authIsLoggedIn==null) {
			
       next('/login')
    }
    next('/login')
  } else {
    next()
  }
})




   window.vueEventBus = new Vue();
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});
