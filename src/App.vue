<template>
  <div id="app">
    <Navbar />
    <div class="container">
        <div class="row mt-3">
            <div class="col-8">
                <!-- <Post /> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Post from './components/Post.vue'

export default {
    name: 'app',
    components: {
        Navbar,
        Post
    }
}
</script>

<style>
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
button:focus {
    outline: none;
}
* {
    margin: 0;
    font-family: Roboto-Regular;
}
.meduim {
    font-family: Roboto-Meduim;
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
