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

button:focus {
    outline: none;
}

.myshadow {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.blue {
    color: #4290FF;
}

.bg-blue {
    background-color: #4290FF;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.mybtn {
    transition: 0.1s;
    padding: 0;
    background: transparent;
    border: none;
}
input:active {
    outline: none !important;
    box-shadow: none !important;
}
input:focus {
    outline: none !important;
    box-shadow: none !important;
}
.mybtn:hover {
    transform: scale(1.1);
}

.btn:active {
    outline: none !important;
    box-shadow: none !important;
}

.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}

.meduim {
    font-family: Roboto-Meduim;
}

.grey {
    color: rgb(189, 188, 188);
}

.myborder {
    border: 1px solid rgb(189, 188, 188);
}

.img-profile:hover {
    transform: scale(1.05);
}

.bubble:hover {
    cursor: pointer;
    transform: scale(1.03);
}

.myborder-left {
    border-left: 1px solid rgb(189, 188, 188);
}

.myborder-left {
    border-right: 1px solid rgb(189, 188, 188);
}

.myimg:hover {
    transform: scale(1.05);
}

@font-face {
    font-family: prime;
    src: url("./assets/fonts/prime-regular.ttf");
}

@font-face {
    font-family: Roboto-Regular;
    src: url('./assets/fonts/roboto-regular.ttf');
}

@font-face {
    font-family: Roboto-Meduim;
    src: url('./assets/fonts/roboto-medium.ttf');
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
@media only screen and (min-width: 992px) {
    .mysearchbar {
        width: 300px !important;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .mycontainer {
        margin-left: 10%;
        margin-right: 10%;
    }

    .mysearchbar {
        width: 350px !important;
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
