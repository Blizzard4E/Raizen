import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Upload from '../components/Upload.vue'
import Profile from '../components/Profile.vue'
import otherProfile from '../components/otherProfile.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/upload',
            name: 'Upload',
            component: Upload
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/otherProfile',
            name: 'otherProfile',
            component: otherProfile
        }
    ]
});