<template>
    <div class="container mt-4">
        <div class="row pb-4 border-bottom">
            <div class="col-2">
                <img class="rounded-circle myborder img-profile" :src="User.profile" width="120px" height="auto">
            </div>
            <div class="col-10">
                <div class="row mt-3">
                    <div class="col-5">
                        <h4 class="meduim bubble">{{ User.name }}</h4>
                        <div>{{ User.email }}</div>
                        <div class="d-flex justify-content-between">
                            <div class="meduim mt-2">{{ User.posts.length }} Posts</div>
                            <div class="meduim mt-2">{{ User.followers.length }} Followers</div>
                            <div class="meduim mt-2">{{ User.following.length }} Following</div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div v-if="!isUser" class="d-flex justify-content-end">
                            <button v-if="!isFollowed" @click.prevent="Follow()" class="btn btn-primary bubble shadow">Follow +</button>
                            <button v-else @click.prevent="Follow()" class="btn btn-danger bubble shadow">Unfollow</button>
                        </div>
                        <div v-else class="d-flex justify-content-end">
                            <button @click.prevent="LogOut()" class="btn btn-danger bubble myshadow">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2 pb-2 border-bottom">
            <div class="col-12 center">
                <div>
                    <button v-if="showPosts" class="btn">
                        <i class="mr-2 far fa-images"></i>Posts
                    </button>
                    <button v-else @click.prevent="getPosts()" class="btn grey">
                        <i class="mr-2 far fa-images"></i>Posts
                    </button>                   
                </div>
                <div class="border-left border-right">
                    <button v-if="showFollowers" class="btn">
                        <i class="mr-2 far fa-user"></i>Followers
                    </button>
                    <button v-else @click.prevent="getFollowers()" class="btn grey">
                        <i class="mr-2 far fa-user"></i>Followers
                    </button>                    
                </div>
                <div>          
                    <button v-if="showFollowing" class="btn">
                        <i class="mr-2 fas fa-walking"></i>Following
                    </button>
                    <button v-else @click.prevent="getFollowing()" class="btn grey">
                        <i class="mr-2 fas fa-walking"></i>Following
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showPosts">
            <div class="row mt-3">
                <div v-for="post in User.posts" :key="post.id" class="col-4"><img class="myimg" :src="post.imageUrl"></div>
            </div>
        </div>
        <div v-if="showFollowers">
            <div class="row mt-3">
                <div class="col-3" v-for="follower in User.followers" :key="follower.id">
                    <div class="box p-3">
                        <div class="center">
                            <img :src="follower.profile" class="rounded-circle myborder img-profile m-1" width="100px" height="auto">
                        </div>
                        <div class="d-block text-center">
                            <h5 class="meduim bubble">{{ follower.name }}</h5>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary py-2 px-3 myshadow bubble">View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showFollowing">
            <div class="row mt-3">
                <div class="col-3" v-for="follow in User.following" :key="follow.id">
                    <div class="box p-3">
                        <div class="center">
                            <img :src="follow.profile" class="rounded-circle myborder img-profile m-1" width="100px" height="auto">
                        </div>
                        <div class="d-block text-center">
                            <h5 class="meduim">{{ follow.name }}</h5>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary py-2 px-3">View Profile</button>
                        </div>
                    </div>
                </div>
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
                posts: [],
                profile: '',
                name: '',
                email: '',
                followers: [],
                following: []
            },
            isUser: false,
            showPosts: false,
            showFollowers: true,
            showFollowing: false,
            isFollowed: false
        }
    },
    methods: {
        getUser(){
            const other_id = localStorage.getItem('other_id');
            const user_id = localStorage.getItem('user_id');
            if(user_id == other_id){
                this.isUser = true;
                axios.get(`${process.env.VUE_APP_API}users/${user_id}`).then(res => {
                this.User = res.data[0];
                this.User.posts.reverse();
                this.$forceUpdate();   
            });
            } else {
                this.isUser = false;
                axios.get(`${process.env.VUE_APP_API}users/${other_id}`).then(res => {
                    this.User = res.data[0];
                    for(let i=0;i<this.User.followers.length;i++){
                    if(this.User.followers[i]._id == user_id){
                        this.isFollowed = true;
                    } else {
                        this.isFollowed = false;
                    }
                }
                    this.$forceUpdate();
                });
            }
        },
        getPosts(){
            this.showPosts = true;
            this.showFollowers = false;
            this.showFollowing = false;
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
        Follow(){
            const other_id = localStorage.getItem('other_id');
            const user_id = localStorage.getItem('user_id');
            axios.post(`${process.env.VUE_APP_API}users/${other_id}/follow`, {
                user_id: user_id,
                other_id: other_id
            }).then(res => {
                this.isFollowed = res.data;
                this.getUser();
            });
        },
        LogOut(){
            this.$gAuth.signOut();
            localStorage.clear();
            this.$router.push('/');
            window.history.go();
        }
    },
    mounted(){
        this.getUser();
    },
    watch: {
        User(val){
            const other_id = localStorage.getItem('other_id');
            const user_id = localStorage.getItem('user_id');
        }
    }
}
</script>

<style scoped>
    .view-profile {
        color: white;
        border: none;
        border-radius: 3px;
        padding: 5px 10px;
    }
    .img-profile {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    }
    .box {
        background: white;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    .box:hover {
        transform: scale(1.05);
    }
</style>
