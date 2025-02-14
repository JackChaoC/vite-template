<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted, provide, ref } from 'vue'

const root = document.documentElement;
const $size = ref('');
const $theme = ref('light');
const $baseUrl = ref(import.meta.env.MODE='development'?'http://localhost:3000':import.meta.env.VITE_BASE_URL);//仅限于标签上使用URL
provide('$size', $size);
provide('$theme', $theme);
provide('$baseUrl', $baseUrl);
onMounted(() => {
    root.setAttribute('data-theme', 'light')
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
    console.log('$size:', $size.value);
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    font-family: "Nunito", "Segoe UI", arial;
}

html {

    &::-webkit-scrollbar {
        width: 6px ;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 2em;
        background-color: #dad6d6;
    }
}

body {
    width: 100%;
    background-color: var(--theme-color-background);
    transition: $transition-background-color;
    touch-action: manipulation;
}

img {
    user-select: none;
}

[data-theme='light'] .theme-switch {
    svg {
        color: #3b10da;
    }
}

[data-theme='dark'] .theme-switch {
    svg {
        color: rgb(255, 253, 148);
    }
}

.theme-switch1 {
    position: fixed;
    bottom: 10px;
    right: 2.2rem;
}
</style>
