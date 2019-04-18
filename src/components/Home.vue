<template>
    <div>
        <div class="container d-none d-md-block">
            <div class="row pt-3">
                <div class="col-9">
                    <Posts />
                </div>
            </div>
        </div>
        <div class="d-md-none">
            <div class="container-fluid p-0">
                <Posts />
            </div>
        </div>
    </div>
</template>

<script>
import Posts from './Posts'

export default {
    components: {
        Posts
    }
}
</script>

<style>

</style>
