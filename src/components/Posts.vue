<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="box my-3">
            <!-- ?Profile -->
            <div class="m-2 d-flex">
                <div class="d-flex">
                    <img class="rounded-circle border border-dark" :src="post.creator.profile" width="45px" height="45px">
                    <div id="mainProfile">
                        <div class="meduim mx-2">{{ post.creator.name }}</div>
                        <div class="small mx-2">{{ post.creator.email }}</div>
                    </div>
                </div>
            </div>
            <!-- ?Content-->
            <img :src="post.imageUrl" width="100%">
            <div class="m-2">
                <div class="form-inline">
                    <div>
                        <button v-if="!post.isLiked" @click.prevent="likePost(post._id)" class="mybtn far fa-heart"></button>
                        <button v-else @click.prevent="likePost(post._id)" class="text-danger mybtn fas fa-heart"></button>
                        <span class="ml-1 meduim">{{ post.likes.length }} likes</span>
                    </div>
                    <div class="ml-3">
                        <button class="mybtn far fa-comment"></button>
                        <span class="ml-1 meduim">0 comments</span>
                    </div>
                </div>
                <div class="info">
                    <div class="meduim title">{{ post.title }}</div>
                    <div class="desc">{{ post.info }}</div>
                </div>
                <div class="mt-1">
                    <div class="meduim">Comments:</div>
                    <div class="mb-1">
                        <div class="comment">
                            <span class="meduim">John:</span>
                            <span class="ml-1">Nice Image.</span>
                        </div>
                    </div>
                    <form id="createComment" class="commentForm">
                        <input type="text" placeholder="Write a comment..." class="mt-1 comment-box border-0">
                    </form>
                </div>
            </div>
        </div>
    </div>               
</template>
<script>
import axios from 'axios';
import { truncate } from 'fs';

export default {
    name: 'Posts',
    data(){
        return {
            postComplete: false,
            posts: [],
            Liked: false
        }
    },
    methods: {
        getAllPosts(){
            axios.get(`${process.env.VUE_APP_API}posts`).then((res) => {
            this.posts = res.data;
            const user_id = localStorage.getItem('user_id')
            for(let i=0;i<this.posts.length;i++){
                axios.post(`${process.env.VUE_APP_API}posts/${user_id}/likes`,{
                    post_id: this.posts[i]._id
                }).then(res => {
                    this.posts[i].isLiked = res.data;
                    this.$forceUpdate();
                });
            }
            });
        },
        likePost(post_id){
            const user_id = localStorage.getItem('user_id');
            axios.post(`${process.env.VUE_APP_API}posts/like/${post_id}`, { 
                post_id : post_id,
                user_id: user_id
            }).then(res=>{
                this.Liked = res.data;
                this.getAllPosts();
            });
        }
    },
    mounted(){
        this.getAllPosts();
    }
}
</script>

<style scoped>
    .box {
        border: solid 1px rgb(216, 214, 214);
        border-radius: 3px;
    }

    .comment-box {
        width: 100%;
        background: transparent;
    }

    .title {
        font-size: 20px;
    }

    .desc {
        font-size: 15px;
    }

    .comment {
        font-size: 14px;
    }

    .mybtn {
        padding: 0;
        background: transparent;
        border: none;
    }

    .commentForm {
        border: solid 1px rgb(216, 214, 214);
        border-left: none;
        border-right: none;
        border-bottom: none;
    }

    .nav-link {
        color: rgb(207, 207, 207);
    }

    .nav-link:hover {
        color: black;
    }
</style>



