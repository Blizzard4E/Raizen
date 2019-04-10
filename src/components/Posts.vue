<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="box my-3">
            <!-- ?Profile -->
            <div class="m-2 d-flex">
                <div class="d-flex">
                    <img class="rounded-circle border border-dark" :src="post.user.profile" width="45px" height="45px">
                    <div id="mainProfile">
                        <div class="meduim mx-2">{{ post.user.name }}</div>
                        <div class="small mx-2">{{ post.user.email }}</div>
                    </div>
                </div>
            </div>
            <!-- ?Content-->
            <img :src="post.image" width="100%">
            <div class="m-2">
                <div class="form-inline">
                    <div>
                        <button class="mybtn far fa-heart"></button>
                        <span class="ml-1 meduim">0 likes</span>
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
                    <div class="comment mb-1">
                        <span class="meduim">John:</span>
                        <span class="ml-1">Nice Image.</span>
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

export default {
    name: 'Posts',
    data(){
        return {
            posts: []
        }
    },
    mounted(){
        axios.get('http://raizen-api.herokuapp.com/api/posts').then((res) => {
            this.posts = res.data;
        });
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



