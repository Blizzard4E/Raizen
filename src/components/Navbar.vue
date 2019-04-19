<template>
    <nav class="bg-white mynavbar sticky-top">
        <div class="mycontainer py-2 d-none d-md-block">
            <div class="row align-items-center">
                <!-- ?Brand -->
                <div class="col-2 h2 prime d-flex justify-content-start">
                    <div class="brand prime">
                        <span class="text-danger">R</span>aizen
                    </div>
                </div>
                <!-- ?Search Bar -->
                <div class="col-4 d-block">
                    <input @input="Search(searchName)" v-model="searchName" class="form-control m-0 bg-light mysearchbar" type="search" placeholder="Search"
                        aria-label="Search">
                    <div v-if="usersFound.length != 0 && searchName != ''" style="position: relative">
                        <div class="search-results">
                            <a @click.prevent="openProfile(found._id)" v-for="found in usersFound" :key="found.id" class="search-item">{{ found.name }}</a>
                        </div>
                    </div>
                </div>
                <!-- ?Navigation -->
                <div class="col-3 justify-content-center">
                    <div class="d-none d-md-block">
                        <div class="center">
                            <router-link class="nav-link" to="/">Home</router-link>
                            <router-link v-if="LoggedIn" class="nav-link" to="/upload">Upload</router-link>
                        </div>
                    </div>
                </div>
                <!-- ?Profile -->
                <div class="col-3 justify-content-center">
                    <div class="d-none d-lg-block center">
                        <a class="bubble" @click.prevent="openProfile()" v-if="LoggedIn">
                            <div class="center">
                                <img class="rounded-circle myborder img-profile" :src="User.profile" width="68px"
                                    height="auto">
                                <div>
                                    <div class="meduim mt-2 mx-2">{{ User.name }}</div>
                                    <div class="d-inline-block text-truncate small mx-2" style="max-width:180px">
                                        {{ User.email }}</div>
                                </div>
                            </div>
                        </a>
                        <div class="d-flex" v-else>
                            <img class="rounded-circle myborder" src="../assets/images/unknown.jpg" width="60px"
                                height="60px">
                            <button class="nav-link m-2 bg-transparent border-0" @click.prevent="LogIn()">Sign
                                In</button>
                        </div>
                    </div>
                    <div class="d-lg-none d-xl-none center">
                        <a class="bubble" @click.prevent="openProfile()" v-if="LoggedIn">
                            <img class="rounded-circle myborder img-profile" :src="User.profile" width="68px"
                                height="auto">
                        </a>
                        <a v-else class="bubble" @click.prevent="LogIn()">
                            <img class="rounded-circle myborder" src="../assets/images/unknown.jpg" width="60px"
                                height="60px">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile -->
        <div class="container-fluid d-md-none py-1 mynavbar">
            <div class="row align-items-center pb-1 border-bottom">
                <div class="col-1 p-0 pl-2">
                    <div class="brand prime" style="font-size:40px">
                        <span class="text-danger">R</span>
                    </div>
                </div>
                <div class="col-9 px-2 d-block">
                    <input @input="Search(searchName)" v-model="searchName" class="form-control m-0 bg-light mysearchbar" type="search" placeholder="Search" aria-label="Search">
                    <div v-if="usersFound.length != 0 && searchName != ''" style="position: relative">
                        <div class="search-results">
                            <a @click.prevent="openProfile(found._id)" v-for="found in usersFound" :key="found.id" class="search-item">{{ found.name }}</a>
                        </div>
                    </div>
                </div>
                <div class="col-2 center">
                    <a class="bubble" @click.prevent="openProfile()" v-if="LoggedIn">
                        <img class="rounded-circle myborder img-profile" :src="User.profile" width="68px" height="auto">
                    </a>
                    <a v-else class="bubble" @click.prevent="LogIn()">
                        <img class="rounded-circle myborder" src="../assets/images/unknown.jpg" width="60px"
                            height="60px">
                    </a>
                </div>
            </div>
            <div class="d-flex justify-content-around mt-1">
                <router-link class="nav-link" to="/">Home</router-link>
                <router-link v-if="LoggedIn" class="nav-link" to="/upload">Upload</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Navbar',
    data() {
        return {
            User: {
                profile: '',
                name: '',
                email: ''
            },
            LoggedIn: false,
            userStored: '',
            searchName: '',
            usersFound: []
        }
    },
    methods: {
        LogIn() {
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
                }).then((res) => {
                    localStorage.setItem('user_id', res.data);
                    console.log('Logged In.');
                    console.log('User Id Recieved And Saved:', localStorage.getItem('user_id'));
                    window.history.go();
                });
            });
        },
        openProfile() {
            localStorage.setItem('other_id', localStorage.getItem('user_id'));
            this.$router.push('/Profile');
            window.history.go();
        },
        Search(name){
            axios.get(`${process.env.VUE_APP_API}users/search/${name}`).then(res => {
                this.usersFound = res.data; 
                this.$forceUpdate();
            });
        },
        openProfile(other_id){
            localStorage.removeItem('other_id');
            localStorage.setItem('other_id', other_id);
            console.log(localStorage.getItem('other_id'));
            this.$router.push('/Profile');
            window.history.go();
        }
    },
    mounted() {
        if (JSON.parse(localStorage.getItem('user'))) {
            this.User = JSON.parse(localStorage.getItem('user'));
            this.LoggedIn = true;
        }
    },
    watch: {
        User(val) {
            val = JSON.parse(localStorage.getItem('user'));
        },
        searchName(val){
            if(!val){
                this.usersFound = [];
                this.$forceUpdate();
            }
        }
    }
}
</script>

<style scoped>
    input:hover {
        transition: 0.23s;
        transform: scale(1.03);
    }
    input:focus {
        transform: scale(1);
    }
    .search-results {
        position: absolute;
        background: white;
        width: 100%;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 3px;
    }
    .search-item {
        display: block;
        padding: 0px 8px;
        color: black;
        text-decoration: none;
    }
    .search-item:hover {
        transform: scale(1.01);
        background: whitesmoke;
        color: rgb(0, 81, 255) !important;
    }
    .nav-link {
        transition: 0.1s;
        color: rgb(189, 188, 188);
    }

    .nav-link:hover {
        transform: scale(1.07);
        color: #4290FF;
    }
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
        width: 100% !important;
    }
</style>




