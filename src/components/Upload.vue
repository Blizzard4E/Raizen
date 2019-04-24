<template>
    <div class="container">
        <div class="row mt-3">
            <form class="col-12">
                <h3 class="bubble">Create Post</h3>
                <div class="mt-3">
                    <div class="form-group bubble">
                        <label class="h5">Title</label>
                        <input v-model="Post.title" class="form-control" type="text">
                    </div>
                    <div class="form-group bubble">
                        <label class="h5">Info</label>
                        <input v-model="Post.info" class="form-control" type="text">
                    </div>
                    <div class="form-group bubble">
                        <label class="h5">Image</label>
                        <input class="form-control-file" type="file" @change="previewImage">
                        <img class="mt-3" v-if="imageUrl" :src="imageUrl" alt="" width="70%" accept=".png, .jpg, .jpeg">
                        <p class="mt-1 text-danger" v-else>Please choose an image.</p>
                    </div>
                    <div v-if="uploaded">
                        <div class="my-1">
                            <router-link to="/" class="btn btn-success myshadow">Return to Home Page</router-link>
                            <span class="mx-2 text-success mt-2">Upload Complete.</span>
                        </div>
                        <button @click.prevent="refreshPage()" class="my-1 btn btn-primary bubble myshadow">Upload Again</button>
                    </div>
                    <div v-if="uploading" class="text-primary d-flex align-items-center my-1">
                        <div>Uploading</div>
                        <div class="mx-1 spinner-border blue spinner-border-sm">
                        <!-- Spinner -->
                        </div>
                    </div>
                    <button v-if="!uploaded && !uploading" @click.prevent="uploadPost" class="btn btn-primary bubble myshadow">Upload</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            uploaded: false,
            uploading: false,
            imageUrl: '',
            Post: {
                title: '',
                info: '',
                image: ''
            }
        }
    },
    methods: {
        previewImage(e) {
            const file = e.target.files[0];
            this.img = e.target.files[0];
            if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
                this.imageUrl = URL.createObjectURL(file);
            } else {
                return;
            }
        },
        uploadPost() {
            const formData = new FormData();
            formData.append('file', this.img);
            formData.append('upload_preset', 'RaizenImages');
            this.uploading = true;
            axios({
                url: 'https://api.cloudinary.com/v1_1/blizzard4e/upload',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then((res) => {
                console.log('Image Saved To:', res.data.secure_url);
                this.uploaded = true;
                this.uploading = false;
                const user_id = localStorage.getItem('user_id');
                axios.post(`${process.env.VUE_APP_API}posts`, {
                    title: this.Post.title,
                    info: this.Post.info,
                    imageUrl: res.data.secure_url,
                    creator: user_id
                }).then(res => {
                    console.log(`Uploaded ${res.data}`);
                });
            });
        },
        refreshPage(){
            window.history.go();
        }
    }
}
</script>

<style scoped>

</style>
