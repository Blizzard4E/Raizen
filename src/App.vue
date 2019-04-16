<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Posts from './components/Posts.vue'
import Upload from './components/Upload.vue'
import Profile from './components/Profile.vue'

export default {
    name: 'app',
    components: {
        Navbar,
        Posts,
        Upload,
        Profile
    }
}
</script>

<style>
* {
    margin: 0;
    transition: 0.2s;
    font-family: Roboto-Regular;
}

body {
    background-color: #F8F9FA;
}

shadow {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

button:focus {
    outline: none;
}

.btn:active {
    outline: none !important;
    box-shadow: none !important;
}

.meduim {
    font-family: Roboto-Meduim;
}

.mygrey {
    color: rgb(189, 188, 188);
}

.myborder {
    border: 1px solid rgb(189, 188, 188);
}

.nav-link {
    transition: 0.1s;
    color: rgb(189, 188, 188);
}

.nav-link:hover {
    transform: scale(1.07);
    color: rgb(59, 59, 59);
}

.img-profile:hover {
    transform: scale(1.05);
}

.bubble:hover {
    transform: scale(1.03);
}

.myborder-left {
    border-left: 1px solid rgb(189, 188, 188);
}

.myborder-left {
    border-right: 1px solid rgb(189, 188, 188);
}

.myimg {
    transition: 0.2s;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    object-position: 100%;
    width: 100%;
    height: 100%;
}

.myimg:hover {
    transform: scale(1.05);
}

@font-face {
    font-family: prime;
    src: url("assets/fonts/prime-regular.ttf");
}

@font-face {
    font-family: Roboto-Regular;
    src: url('assets/fonts/roboto-regular.ttf');
}

@font-face {
    font-family: Roboto-Meduim;
    src: url('assets/fonts/roboto-medium.ttf');
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .mycontainer {
        margin-left: 2%;
        margin-right: 2%;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .mycontainer {
        margin-left: 10%;
        margin-right: 10%;
    }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .mycontainer {
        margin-left: 2%;
        margin-right: 2%;
    }
}
</style>
