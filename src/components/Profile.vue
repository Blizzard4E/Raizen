<template>
    <div class="container mt-4">
        <div class="row pb-4 border-bottom">
            <div class="col-2">
                <img class="rounded-circle myborder" :src="User.profile" width="120px" height="auto">
            </div>
            <div class="col-10">
                <div class="row mt-3">
                    <div class="col-5">
                        <h4>{{ User.name }}</h4>
                        <div>{{ User.email }}</div>
                        <div class="d-flex justify-content-between">
                            <div class="meduim mt-2">{{ posts.length }} Posts</div>
                            <div class="meduim mt-2">0 Followers</div>
                            <div class="meduim mt-2">0 Following</div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="d-flex justify-content-end">
                            <button @click.prevent="LogOut()" class="btn btn-danger">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2 pb-2 border-bottom">
            <div class="col-12 d-flex justify-content-center">
                <div>
                    <button v-if="!showPosts" @click.prevent="getPosts()" class="btn mygrey">
                        <i class="mr-2 far fa-images"></i>Posts
                    </button>
                    <button v-else class="btn">
                        <i class="mr-2 far fa-images"></i>Posts
                    </button>
                </div>
                <div class="border-left border-right">
                    <button v-if="!showFollowers" @click.prevent="getFollowers()" class="btn mygrey">
                        <i class="mr-2 far fa-user"></i>Followers
                    </button>
                    <button v-else class="btn">
                        <i class="mr-2 far fa-user"></i>Followers
                    </button>
                </div>
                <div>
                    <button v-if="!showFollowing" @click.prevent="getFollowing()" class="btn mygrey">
                        <i class="mr-2 fas fa-walking"></i>Following
                    </button>
                    <button v-else class="btn">
                        <i class="mr-2 fas fa-walking"></i>Following
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showPosts">
            <div class="row mt-3">
                <div v-for="post in posts" :key="post.id" class="col-4"><img class="myimg" :src="post.imageUrl"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { truncate } from 'fs';

export default {
    data(){
        return{
            User: {
                profile: '',
                name: '',
                email: ''
            },
            posts: [],
            showPosts: false,
            showFollowers: false,
            showFollowing: false
        }
    },
    methods: {
        getPosts(){
            const user_id = localStorage.getItem('user_id');
            console.log(user_id);
            axios.get(`${process.env.VUE_APP_API}posts/profile/${user_id}`).then(res => {
            this.posts = res.data;
            this.showPosts = true;
            this.showFollowers = false;
            this.showFollowing = false;
            });   
        },
        getFollowers(){
            this.showPosts = false;
            this.showFollowers = true;
            this.showFollowing = false;
        },
        getFollowing(){
            this.showPosts = false;
            this.showFollowers = false;
            this.showFollowing = true;
        },
        LogOut(){
            this.$gAuth.signOut();
            localStorage.removeItem('user');
            localStorage.removeItem('user_id');
            this.$router.push('/');
            window.history.go();
        }
    },
    mounted(){
        this.User = JSON.parse(localStorage.getItem('user'));    
        this.getPosts();
    }
}
</script>

<style>
    .mygrey {
        color: rgb(189, 188, 188);
    }
    .myborder-left {
        border-left: 1px solid rgb(189, 188, 188);
    }
    .myborder-left {
        border-right: 1px solid rgb(189, 188, 188);
    }
    .myimg {
        object-fit: cover;
        object-position: 100%;
        width: 100%;
        height: 100%;
    }
</style>
