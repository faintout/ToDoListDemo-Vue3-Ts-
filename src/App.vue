<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'App',
        components: {
        },

    })
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    html,
    body{
        height: 100%;
        width: 100%;
        background-color: #cdcdcd;
    }
</style>