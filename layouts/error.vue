<script>
export default {
    props: ['error'],
  //layout: 'errorLayout' // you can set a custom layout for the error page
    layout: "auth",
    head() {
        return {
            title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
        };
    },
    data() {
        return {
            title: "Error-500",
        };
    },
    methods: {
        refresh() {
            document.location.reload();
        }
    },
    middleware: "authentication"
}
</script>


<template>
<div class="my-5 pt-sm-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="text-center">

                    <div v-if="error.statusCode == '404'">
                        <div>
                            <div class="row justify-content-center">
                                <div class="col-sm-4">
                                    <div class="error-img">
                                        <img src="~/assets/images/404-error.png" alt class="img-fluid mx-auto d-block" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h4 class="text-uppercase mt-4">404 Error</h4>
                        <p class="text-muted">
                            {{error.message}} 
                        </p>
                    </div>

                    <div v-else>
                        <div>
                            <div class="row justify-content-center">
                                <div class="col-sm-4">
                                    <div class="error-img">
                                        <img src="~/assets/images/500-error.png" alt class="img-fluid mx-auto d-block" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h4 class="text-uppercase mt-4">Internal Server Error</h4>
                        <p class="text-muted">
                            {{error.message}} 
                        </p>
                    </div>

                    <div class="mt-5">
                        <nuxt-link to="/" class="btn btn-primary">Back to BEEABLE CMS Dashboard</nuxt-link>
                        <div class="btn btn-primary" @click="refresh">Refresh</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>
