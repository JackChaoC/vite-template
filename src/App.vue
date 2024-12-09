<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted, provide, reactive, ref } from 'vue'

const $size = ref('');
provide('$size', $size);
onMounted(() => {
    calWindowWidth()
    window.addEventListener('resize', () => {
        calWindowWidth()
    })
    

})
var calWindowWidth = () => {
    const width = window.innerWidth;
    if (width < 576) {
        $size.value = 1; // Extra Small
    } else if (width >= 576 && width < 768) {
        $size.value = 2; // Small
    } else if (width >= 768 && width < 992) {
        $size.value = 3; // Medium
    } else if (width >= 992 && width < 1200) {
        $size.value = 4; // Large
    } else {
        $size.value = 5; // Extra Large
    }
    console.log('$size:',$size.value);
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

html,
body {
    width: 100%;
    height: 100%;
    overflow: none;
    scrollbar-width: thin;
}

#app {
    width: 100%;
}
</style>
