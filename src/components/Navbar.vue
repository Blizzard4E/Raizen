<template>
    <nav class="bg-white mynavbar sticky-top">
        <div class="mycontainer py-2">
            <div class="row">
                <!-- ?Brand -->
                <div class="col-3 h2 prime d-flex justify-content-start align-items-center">
                    <div class="brand prime">
                        <span class="text-danger">R</span>aizen
                    </div>
                </div>
                <!-- ?Search Bar -->
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <form class="form-inline">
                        <input class="form-control mysearchbar bg-light" type="search" placeholder="Search"
                            aria-label="Search">
                    </form>
                </div>
                <!-- ?Navigation -->
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link v-if="LoggedIn" class="nav-link" to="/upload">Upload</router-link>
                </div>
                <!-- ?Profile -->
                <div class="col-3 d-flex justify-content-start align-items-center">
                    <div class="d-flex" v-if="LoggedIn">
                        <div class="d-flex">
                            <router-link to="/profile"><img class="rounded-circle myborder img-profile" :src="User.profile" width="68px" height="auto"></router-link>
                            <div id="mainProfile">
                                <div class="meduim mt-2 mx-2">{{ User.name }}</div>
                                <div class="d-inline-block text-truncate small mx-2" style="max-width:180px">{{ User.email }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" v-else>
                        <img class="rounded-circle myborder" src="../assets/images/notlogin.png" width="60px"
                            height="60px">
                        <button class="nav-link m-2 bg-transparent border-0" @click.prevent="LogIn()">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Navbar',
    data(){
        return {
            User: {
                profile: '',
                name: '',
                email: ''
            },
            LoggedIn: false,
            userStored: ''
        }
    },
    methods: {
        LogIn(){
            this.$gAuth.signIn().then(GoogleUser => {
                this.LoggedIn = true;
                const user = {
                    profile: GoogleUser.w3.Paa,
                    name: GoogleUser.w3.ig,
                    email: GoogleUser.w3.U3
                }
                this.User = user;
                localStorage.setItem('user', JSON.stringify(user));
                // Create an Account or Login
                console.log('Google Account Info Sent To Server.')
                axios.post(`${process.env.VUE_APP_API}users`, {
                    profile: this.User.profile,
                    name: this.User.name,
                    email: this.User.email
                }).then((res)=>{
                    localStorage.setItem('user_id', res.data);
                    console.log('Logged In.');
                    console.log('User Id Recieved And Saved:',localStorage.getItem('user_id'));
                    window.history.go();
                });
            });
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user'))){
            this.User=JSON.parse(localStorage.getItem('user'));
            this.LoggedIn = true;
        } 
    },
    watch: {
        User(val){
            val = JSON.parse(localStorage.getItem('user'));
        }
    }
}
</script>

<style scoped>
    .img-profile:hover {
        transform: scale(1.05);
    }
    .brand:hover {
        transform: scale(1.05);
    }
    .prime {
        font-family: prime;
    }
    .mynavbar {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    }
    .mysearchbar {
        width: 400px !important;
    }
</style>




