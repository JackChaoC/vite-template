<template>
    <div class="home-inside box">

        home
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const message = ref('Hello, Vue 3!');
onMounted(()=>{
    console.log('here is home');
    
})
</script>

<style scoped lang="scss">
.home-inside{
    box-sizing: border-box;
    height: 1000px;
    width: 100%;
    // position: relative;
    background-color: #72d589;
    scrollbar-width: none; /* Firefox */
    // background: $color-primary-linear;
}
</style>