<template>
    <div class="container">
        <div class="row mt-3">
            <form class="col-12">
                <h3>Create Post</h3>
                <div class="mt-3">
                    <div class="form-group">
                        <label class="h5">Title</label>
                        <input v-model="Post.title" class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <label class="h5">Info</label>
                        <input v-model="Post.info" class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <label class="h5">Image</label>
                        <input class="form-control-file" type="file" @change="previewImage">
                        <img class="mt-3" v-if="imageUrl" :src="imageUrl" alt="" width="70%" accept=".png, .jpg, .jpeg">
                        <p class="mt-1 text-danger" v-else>Please choose an image.</p>
                    </div>
                    <div v-if="uploaded">
                        <router-link to="/" class="btn btn-success">Return to Home Page</router-link>
                        <div class="text-success mt-2">Upload Successful.</div>
                    </div>
                    <button v-else @click.prevent="uploadPost" class="btn btn-primary">Upload</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            uploaded: false,
            imageUrl: '',
            Post: {
                title: '',
                info: '',
                image: ''
            }
        }
    },
    methods: {
        previewImage(e){
            const file = e.target.files[0];
            this.img = e.target.files[0];
            if(file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png'){
                this.imageUrl = URL.createObjectURL(file);
            } else {
                return;
            }
        },
        uploadPost(){
            const formData = new FormData();
            formData.append('file', this.img);
            formData.append('upload_preset', 'RaizenImages');
            console.log('Saving Image...')
            axios({
                url: 'https://api.cloudinary.com/v1_1/blizzard4e/upload',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then((res)=>{
                console.log('Image Saved To:', res.data.secure_url);
                this.uploaded = true;
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
        }
    }
}
</script>

<style>

</style>
