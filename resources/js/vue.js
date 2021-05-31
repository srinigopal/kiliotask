// import Vue
    window.Vue = require('vue');

    if (process.env.MIX_ENV === 'production') {

        Vue.config.devtools = false;
        Vue.config.debug = false;
        Vue.config.silent = true;

    } else {

        Vue.config.productionTip = false;

    }

// main global mixin - mostly helpers
    Vue.mixin({

        computed: {

            // config

                attemptingConfig: function() {

                    //will only do actual config attempt when user is logged in, so let's return false for non-authed areas
                    if (authIsLoggedIn) {
                        return vueStore.state.configGetState != 'SUCCESS';
                    } else {
                        return false;
                    }

                },

            //helpers

                //generic helper to show modals
                // showModal: function(id, location, preShowFunction) {

                //     if (typeof(preShowFunction) === 'function') {
                //         preShowFunction();
                //     }

                //     showModal(id, location);
     
                // },

            // route

                currentRoute: function() {
                    if (vueStore.state.route) {
                        return vueStore.state.route;
                    }
                },

            // user


                isLoggedIn: function() {
                    if (vueStore.state.user) {
                        return vueStore.state.auth.isLoggedIn;
                    }
                },



               

           

               

                             

        },

        methods: {

            // vue

                // https://jasonwatmore.com/post/2018/09/10/vuejs-set-get-delete-reactive-nested-object-properties
                deleteProp: function(obj, props) {

                    const prop = props.shift();

                    if (! obj[prop]) {
                        return;
                    }

                    if (! props.length) {

                        Vue.delete(obj, prop);

                        return;

                    }
                    
                    this.deleteProp(obj[prop], props);

                },

                // https://jasonwatmore.com/post/2018/09/10/vuejs-set-get-delete-reactive-nested-object-properties
                getProp: function(obj, props) {

                    const prop = props.shift();

                    if (! obj[prop] || ! props.length) {
                        return obj[prop]
                    }

                    return this.getProp(obj[prop], props);

                },

                // https://jasonwatmore.com/post/2018/09/10/vuejs-set-get-delete-reactive-nested-object-properties
                setProp: function(obj, props, value) {

                    const prop = props.shift();

                    if (! obj[prop]) {
                        Vue.set(obj, prop, {})
                    }

                    if (! props.length) {

                        if (value && typeof value === 'object' && ! Array.isArray(value)) {
                      
                            obj[prop] = { ...obj[prop], ...value }

                        } else {

                            obj[prop] = value;

                        }

                        return;

                    }

                    this.setProp(obj[prop], props, value);

                }

        }

    });

// add Vuex store
    import Vuex from 'vuex';

    Vue.use(Vuex);

    window.vueStore = new Vuex.Store({
        state: {
            auth: {
                isLoggedIn: false
            },
            configGetState: 'NO_ATTEMPT',
            route: null,
            user: null
        },
        mutations: {
            authIsLoggedIn: function(state, payload) {
                state.auth.isLoggedIn = payload;
            },
            configGetState: function(state, payload) {
                state.configGetState = payload;
            },
            route: function(state, payload) {
                state.route = payload;
            },
            user: function(state, payload) {
                state.user = payload;
            }
        },
        actions: {
            getConfig(context) {

                //update config get state
                vueStore.commit('configGetState', 'ATTEMPTING');

                //get config
                axios.get('/ap/me')
                    .then(function(response) {

                        //update config get state
                        vueStore.commit('configGetState', 'SUCCESS');

                        //mutate user state
                        vueStore.commit('user', response.data.user ? response.data.user : null);

                    })
                    .catch(function(response) {

                        vueStore.commit('configGetState', 'FAILED'); //TODO - redirect to some error page

                    });

            }
        }
    });

    //window.authIsLoggedIn - set depending on whether we have an api_token META key
    if (authIsLoggedIn) {

        vueStore.commit('authIsLoggedIn', true);

        //set initial config for vueStore
        vueStore.dispatch('getConfig');
        
    } else {
        vueStore.commit('authIsLoggedIn', false);
    }

    //route - can't find a better way to do this right now...
    let currentRoute = document.head.querySelector('meta[name="cur-rte"]');

    if (currentRoute) {
        vueStore.commit('route', (typeof(currentRoute) != 'undefined') ? currentRoute.content : null);
    }


//setup global event bus 
    window.vueEventBus = new Vue();