export default {
    computed: {
        
    },

    data: function() {
        return {
            form: {
                hasErrors: false,
                errorList: {}
            }
        };
    },

    methods: {

        formDoValidation: function(attributes, constraints) {

            var self = this;

            this.form.hasErrors = false;

            this.form.errorList = {};

            var validation = validate(attributes, constraints, {
                fullMessages: false
            });

            if (_.isObject(validation)) {
                _.forEach(validation, function(errors) {
                    _.forEach(errors, function(error) {
                        self.$set(
                            self.form.errorList,
                            "model." + error.model,
                            error.message
                        );

                        self.form.hasErrors = true;
                    });
                });
            }

            if (this.form.hasErrors) {
                return false;
            } else {
                return true;
            }
        },

        

       

        

        formHandleError: function(errors) {

            var self = this;

            _.forEach(errors, function(error, key) {
                self.$set(self.form.errorList, "model." + key, _.first(error));
            });

            this.form.hasErrors = true;

            Toastify({
                text: "Invalid form data - please check your entries.",
                duration: 3000,
                close: false,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#e51c23",
                stopOnFocus: true
            }).showToast();
        },

        formHandleOtherError: function(error) {

            Toastify({
                text: error ? error : "An unknown error has occurred.",
                duration: 3000,
                close: false,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#e51c23",
                stopOnFocus: true
            }).showToast();
        },

        formInitFields: function(fields) {
            console.log('init', fields);
            if (fields.dates) {
                _.each(fields.dates, function(field) {

                    if (field.ready = false) {
                        console.log('not ready');
                        return;
                    }
                    // If no date is provided, blank the datepicker
                    if (field.default) {
                        vueEventBus.$emit('datepicker-update-date', field.name, field.default)
                    } else {
                        vueEventBus.$emit('reset-select-date', field.name);
                    }

                });    
            }
            
            if (fields.selects) {

                _.each(fields.selects, function(field) {

                    if (field.ready = false) {
                        return;
                    }
                    // If no default is provided, blank the select2
                    if (field.default) {
                        vueEventBus.$emit('select2-select-single', field.name, field.default)
                    } else {
                        vueEventBus.$emit('select2-reset', field.name);
                    }

                });

            }

        },

        formIsInvalid: function(field) {
            if (!this.form.hasErrors) {
                return false;
            }

            if (this.form.errorList[field]) {
                return true;
            }
        },

        formPostModel: function(url, redirect) {

            var thisComponent = this;

            thisComponent.flag.postingModel = true;

            thisComponent.form.hasErrors = false;

            thisComponent.form.errorList = {};

            return new Promise(function(resolve, reject) {
                axios
                    .post("/api/" + url, thisComponent.model)
                    .then(function(response) {
                        if (response.data.redirect) {
                            window.location.replace(response.data.redirect);
                        }
                        resolve(response);
                    })
                    .catch(function(error) {
                        if (error.response.status !== 200) {
                            if (error.response.data.status == "formError") {
                                thisComponent.formHandleError(
                                    error.response.data.errors
                                );
                            } else {
                                thisComponent.formHandleOtherError(
                                    error.response.data.errors
                                );
                            }
                        }

                        thisComponent.flag.postingModel = false;
                        reject(error);
                    });
            });
        },

        formPatchModel: function(url, redirect) {

            var thisComponent = this;

            thisComponent.flag.postingModel = true;

            thisComponent.form.hasErrors = false;

            thisComponent.form.errorList = {};

            return new Promise(function(resolve, reject) {
                axios
                    .patch("/api/" + url, thisComponent.model)
                    .then(function(response) {
                        if (response.data.redirect) {
                            window.location.replace(response.data.redirect);
                        }
                        resolve(response);
                    })
                    .catch(function(error) {
                        if (error.response.status !== 200) {
                            if (error.response.data.status == "formError") {
                                thisComponent.formHandleError(
                                    error.response.data.errors
                                );
                            } else {
                                thisComponent.formHandleOtherError(
                                    error.response.data.errors
                                );
                            }
                        }

                        thisComponent.flag.postingModel = false;
                        reject(error);
                    });
            });
        },

        formGetModel: function(url) {

            var thisComponent = this;

            thisComponent.flag.modelGetState = "ATTEMPTING";

            return new Promise(function(resolve, reject) {
                axios
                .get("/api/" + url)

                .then(function(response) {
                    //set base model to keep an unmodified state
                    thisComponent.baseModel = response.data.data;

                    //setup working model from base model
                    thisComponent.model = _.cloneDeep(thisComponent.baseModel);

                    thisComponent.flag.modelGetState = "SUCCESS";
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response.status !== 200) {
                        if (error.response.data.status == "formError") {
                            thisComponent.formHandleError(
                                error.response.data.errors
                            );
                        } else {
                            thisComponent.formHandleOtherError(
                                error.response.data.errors
                            );
                        }
                    }
                    thisComponent.flag.modelGetState = "FAILED";
                    reject(error);
                })
                .finally(function() {
                    thisComponent.flag.modelState = "UNMODIFIED"; //explicitly set to UNMODIFIED on first load
                });
            });
        },

        
        



        /*
            Checks if this is the first update to model from a component.

            Some components (like select2 and date), will update the model when they are loaded.
            This will set the model state to MODIFIED, even though the data was not actually changed.
            We cannot simply delay _setupObservers(), as we would need to maintain a list of all components on the page.
            To counter this, we keep a list of all components that have made an update.
            If this is the first, it it part of the page load and should be ignored. Otherwise, update the model.

            @param {string} componentId.    The component to check

            @return {bool} True on first run, false every time after.

        */
        firstUpdate: function(componentId) {

            var thisComponent = this;

            // If this component hasn't been recorded
            if (! thisComponent.initComponents[componentId]) {

                thisComponent.initComponents[componentId] = true;
                
                // This is the first update
                return true;

            } else {
                
                // This is not the first update
                return false;

            }

        }
    },

    mounted: function() {}
};
