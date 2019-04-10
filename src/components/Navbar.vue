<template>
    <nav class="bg-white mynavbar sticky-top">
        <div class="mycontainer">
            <div class="row">
                <!-- ?Brand -->
                <div class="col-3 h2 prime mt-3"><span class="prime text-danger">R</span>aizen</div>
                <!-- ?Search Bar -->
                <div class="col-3 mt-3">
                    <form class="form-inline">
                        <input class="form-control mysearchbar bg-light" type="search" placeholder="Search"
                            aria-label="Search">
                    </form>
                </div>
                <!-- ?Navigation -->
                <div class="col-3 d-flex mt-3 justify-content-end">
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link v-if="LoggedIn" class="nav-link" to="/upload">Upload</router-link>
                    <router-link v-else class="nav-link disabled" to="/">Upload</router-link>
                </div>
                <!-- ?Profile -->
                <div class="col-3 my-2">
                    <div class="d-flex" v-if="LoggedIn">
                        <div class="d-flex">
                            <img class="rounded-circle border border-dark" :src="User.profile" width="60px" height="60px">
                            <div id="mainProfile">
                                <div class="meduim mt-2 mx-2">{{ User.name }}</div>
                                <small class="mx-2">{{ User.email }}</small>
                            </div>
                        </div>
                        <button class="nav-link m-2 bg-transparent border-0" @click.prevent="LogOut()">Sign Out</button>
                    </div>
                    <div class="d-flex" v-else>
                        <img class="rounded-circle border border-dark" src="../assets/images/notlogin.png" width="60px"
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
                console.log(JSON.parse(localStorage.getItem('user')));
                // Create an Account or Login
                axios.post('http://raizen-api.herokuapp.com/api/users', {
                    profile: this.User.profile,
                    name: this.User.name,
                    email: this.User.email
                });
            })
        },
        LogOut(){
            this.LoggedIn = false;
            this.$gAuth.signOut();
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user')) != null){
            this.User=JSON.parse(localStorage.getItem('user'));
            this.LoggedIn=true;
        }
    },
    watch: {
        LoggedIn(val){
            if(!val){
                localStorage.removeItem('user');
            }
        }
    }
}
</script>

<style scoped>
    .nav-link {
        transition: 0.25s;
        color: rgb(189, 188, 188);
    }

    .nav-link:hover {
        color: rgb(59, 59, 59);
    }

    .prime {
        font-family: prime;
    }

    .mynavbar {
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
    }

    .mysearchbar {
        width: 400px !important;
    }
</style>




