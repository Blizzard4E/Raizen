<template>
    <form>
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
            <button @click.prevent="uploadPost" class="btn btn-primary">Upload</button>
            <div class="text-success mt-3" v-if="uploaded">Upload Successful.</div>
        </div>
    </form>
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
            axios({
                url: 'https://api.cloudinary.com/v1_1/blizzard4e/upload',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then((res)=>{
                this.uploaded = true;
                const User = JSON.parse(localStorage.getItem('user'));
                this.Post.image = res.data.secure_url;
                axios.post('http://raizen-api.herokuapp.com/api/posts', {
                    title: this.Post.title,
                    info: this.Post.info,
                    image: this.Post.image,
                    user: {
                        name: User.name,
                        email: User.email
                    }
                });
            }); 
        }
    }
}
</script>

<style>

</style>
