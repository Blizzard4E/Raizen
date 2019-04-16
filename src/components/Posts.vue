<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="box my-3">
            <!-- ?Profile -->
            <div class="m-2 d-flex">
                <div class="d-flex">
                    <button class="mybtn" @click.prevent="openProfile(post.creator._id)">
                        <img class="rounded-circle border mygrey img-profile" :src="post.creator.profile" width="52px" height="52px">
                    </button>
                    <div id="mainProfile">
                        <div class="meduim mx-2 mt-1">{{ post.creator.name }}</div>
                        <div class="small mx-2">{{ post.creator.email }}</div>
                    </div>
                </div>
            </div>
            <!-- ?Content-->
            <img class="img-post" :src="post.imageUrl" width="100%">
            <div class="m-2">
                <div class="form-inline">
                    <div>
                        <button v-if="!post.isLiked" @click.prevent="likePost(post._id)" class="mybtn far fa-heart"></button>
                        <button v-else @click.prevent="likePost(post._id)" class="text-danger mybtn fas fa-heart"></button>
                        <span class="ml-1 meduim">{{ post.likes.length }} likes</span>
                    </div>
                    <div class="ml-3">
                        <button @click.prevent="focusComment()" class="mybtn">
                            <i class="far fa-comment" style="color: black"></i>
                        </button>
                        <span class="ml-1 meduim">{{ post.comments.length }} comments</span>
                    </div>
                </div>
                <div class="info">
                    <div class="meduim title">{{ post.title }}</div>
                    <div class="desc">{{ post.info }}</div>
                </div>
                <div class="mt-1">
                    <div class="meduim">Comments:</div>
                    <div class="mb-1">
                        <div class="comment" v-for="comment in post.comments" :key="comment.id">
                            <span class="meduim">{{ comment.commenter.name }}:</span>
                            <span class="ml-1">{{ comment.comment }}</span>
                        </div>
                    </div>
                    <form class="commentForm">
                        <div class="d-flex">
                            <input id="commentInput" v-model="post.commentText" type="text" placeholder="Write a comment..." class="mt-1 px-1 comment-box border-0">
                            <div class="ml-1 d-flex align-item-center">
                                <button @click.prevent="commentPost(post._id, post.commentText)" class="btn sendbtn mt-1 meduim">Post</button>
                            </div>
                        </div>
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
            posts: []
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
                    this.posts[i].commentText = '';
                    this.$forceUpdate();
                });
            }
            });
        },
        likePost(post_id){
            const user_id = localStorage.getItem('user_id');
            axios.post(`${process.env.VUE_APP_API}posts/like/${post_id}`, {
                user_id: user_id
            }).then(res=>{
                this.getAllPosts();
            });
        },
        commentPost(post_id, commentText){
            const user_id = localStorage.getItem('user_id');
            axios.post(`${process.env.VUE_APP_API}posts/comment/${post_id}`, {
                user_id: user_id,
                comment_text: commentText
            }).then(res=>{
                this.getAllPosts();
            });
        },
        openProfile(others_id){
            localStorage.setItem('others_id', others_id);
            this.$router.push('/otherProfile');
        },
        focusComment(){
            setTimeout(function() {
                document.getElementById("commentInput").focus();
            }, 0);
        }
    },
    mounted(){
        this.getAllPosts();
    }
}
</script>

<style scoped>
    .img-profile:hover {
            transform: scale(1.02);
    }
    .img-post:hover {
        transform: scale(1.012);
    }
    .box {
        background: white;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        padding: 1px 0px;
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
    .sendbtn {
        transition: 0.25s;
        color: rgb(0, 162, 255);
        padding: 0;
        background: transparent;
        border: none;
    }
    .mybtn {
        transition: 0.1s;
        padding: 0;
        background: transparent;
        border: none;
    }
    .mybtn:hover {
        transform: scale(1.1);
    }
    .commentForm {
        border: solid 1px rgb(216, 214, 214);
        border-left: none;
        border-right: none;
        border-bottom: none;
    }
</style>



