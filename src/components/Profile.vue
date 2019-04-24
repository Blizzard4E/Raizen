<template>
    <div class="container my-4">
        <div class="row pb-4">
            <div class="col-3 center">
                <img class="rounded-circle myborder img-profile" :src="User.profile" width="120px" height="auto">
            </div>
            <div class="col-9 d-flex align-items-center text-truncate">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between">
                        <div class="meduim" style="font-size:20px">{{ User.name }}</div>
                        <div v-if="!isUser" class="d-flex justify-content-end">
                            <button v-if="!isFollowed" @click.prevent="Follow()"
                                class="btn btn-primary bubble shadow">Follow +</button>
                            <button v-else @click.prevent="Follow()"
                                class="btn btn-danger bubble shadow">Unfollow</button>
                        </div>
                        <div v-else class="d-flex justify-content-end">
                            <button @click.prevent="LogOut()" class="btn btn-danger bubble myshadow">Sign Out</button>
                        </div>
                    </div>
                    <div>{{ User.email }}</div>
                    <div class="d-flex mt-2">
                        <div class="mx-2 d-block text-center">
                            <div class="meduim text-primary">{{ User.posts.length }}</div>
                            <div>Posts</div>
                        </div>
                        <div class="mx-2 d-block text-center">
                            <div class="meduim text-primary">{{ User.followers.length }}</div>
                            <div>Followers</div>
                        </div>
                        <div class="mx-2 d-block text-center">
                            <div class="meduim text-primary">{{ User.following.length }}</div>
                            <div>Following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- PC -->
        <div class="row d-none d-md-block">
            <div class="col-12 row center m-0 py-2 border-top border-bottom">
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
            <div class="col-12">
                <div v-if="showPosts">
                    <div class="row mt-3">
                        <div v-for="post in User.posts" :key="post.id" class="col-4 p-1"><img class="myimg"
                                :src="post.imageUrl">
                        </div>
                    </div>
                </div>
                <div v-if="showFollowers">
                    <div class="row mt-3">
                        <div class="col-3 p-1" v-for="follower in User.followers" :key="follower.id">
                            <button @click.prevent="openProfile(follower._id)" class="box p-3">
                                <div class="center">
                                    <img :src="follower.profile" class="rounded-circle myborder img-profile m-1"
                                        width="100px" height="auto">
                                </div>
                                <div class="d-block text-center">
                                    <h6 class="meduim bubble text-truncate">{{ follower.name }}</h6>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="openProfile(follower._id)" class="btn btn-primary py-2 px-3 myshadow bubble">More</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="showFollowing">
                    <div class="row mt-3">
                        <div class="col-3 p-1" v-for="follow in User.following" :key="follow.id">
                            <button @click.prevent="openProfile(follow._id)" class="box p-3">
                                <div class="center">
                                    <img :src="follow.profile" class="rounded-circle myborder img-profile m-1" width="100px"
                                        height="auto">
                                </div>
                                <div class="d-block text-center">
                                    <h6 class="meduim bubble text-truncate">{{ follow.name }}</h6>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="openProfile(follow._id)" class="btn btn-primary py-2 px-3 myshadow">More</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile -->
        <div class="row d-md-none">
            <div class="col-12 row center m-0 border-top border-bottom py-2">
                    <div>
                        <button v-if="showPosts" class="btn">
                            <i class="far fa-images fa-2x"></i>
                        </button>
                        <button v-else @click.prevent="getPosts()" class="btn grey">
                            <i class="far fa-images fa-2x"></i>
                        </button>
                    </div>
                    <div>
                        <button v-if="showFollowers" class="btn">
                            <i class="far fa-user fa-2x"></i>
                        </button>
                        <button v-else @click.prevent="getFollowers()" class="btn grey">
                            <i class="far fa-user fa-2x"></i>
                        </button>
                    </div>
                    <div>
                        <button v-if="showFollowing" class="btn">
                            <i class="fas fa-walking fa-2x"></i>
                        </button>
                        <button v-else @click.prevent="getFollowing()" class="btn grey">
                            <i class="fas fa-walking fa-2x"></i>
                        </button>
                    </div>
            </div>
            <div class="col-12">
                <div v-if="showPosts">
                    <div class="row mt-3">
                        <div v-for="post in User.posts" :key="post.id" class="col-6 p-1"><img class="myimg"
                                :src="post.imageUrl">
                        </div>
                    </div>
                </div>
                <div v-if="showFollowers">
                    <div class="row mt-3">
                        <div class="col-6 p-1" v-for="follower in User.followers" :key="follower.id">
                            <button @click.prevent="openProfile(follower._id)" class="box p-2">
                                <div class="center">
                                    <img :src="follower.profile" class="rounded-circle myborder img-profile m-1"
                                        width="100px" height="auto">
                                </div>
                                <div class="d-block text-center">
                                    <h6 class="meduim bubble d-inline-block text-truncate" style="max-width:130px">{{ follower.name }}</h6>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="openProfile(follower._id)" class="btn btn-primary py-1 px-3 myshadow bubble">More</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="showFollowing">
                    <div class="row mt-3">
                        <div class="col-6 p-1" v-for="follow in User.following" :key="follow.id">
                            <button @click.prevent="openProfile(follow._id)" class="box p-2">
                                <div class="center">
                                    <img :src="follow.profile" class="rounded-circle myborder img-profile m-1" width="100px"
                                        height="auto">
                                </div>
                                <div class="d-block text-center">
                                    <h6 class="meduim bubble d-inline-block text-truncate" style="max-width:130px">{{ follow.name }}</h6>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="openProfile(follow._id)" class="btn btn-primary py-1 px-3 myshadow">More</button>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {
    truncate
} from 'fs';

export default {
    data() {
        return {
            User: {
                posts: [],
                profile: '',
                name: '',
                email: '',
                followers: [],
                following: []
            },
            isUser: false,
            showPosts: true,
            showFollowers: false,
            showFollowing: false,
            isFollowed: false
        }
    },
    methods: {
        getUser() {
            const other_id = localStorage.getItem('other_id');
            const user_id = localStorage.getItem('user_id');
            if (user_id == other_id) {
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
                    for (let i = 0; i < this.User.followers.length; i++) {
                        if (this.User.followers[i]._id == user_id) {
                            this.isFollowed = true;
                        } else {
                            this.isFollowed = false;
                        }
                    }
                    this.$forceUpdate();
                });
            }
        },
        getPosts() {
            this.showPosts = true;
            this.showFollowers = false;
            this.showFollowing = false;
        },
        getFollowers() {
            this.showPosts = false;
            this.showFollowers = true;
            this.showFollowing = false;
        },
        getFollowing() {
            this.showPosts = false;
            this.showFollowers = false;
            this.showFollowing = true;
        },
        Follow() {
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
        LogOut() {
            this.$gAuth.signOut();
            localStorage.clear();
            this.$router.push('/');
            window.history.go();
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
        this.getUser();
    },
    watch: {
        User(val) {
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
        width: 100%;
        margin: 0;
        border: none;
        background: white;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .box:hover {
        transform: scale(1.05);
    }

    .myimg {
        transition: 0.2s;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 200px;
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {}

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {}

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {}

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {}

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        .btn {
            font-size: 12px;
        }
    }
</style>
