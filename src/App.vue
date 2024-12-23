<template>
    <router-view></router-view>
    <el-switch v-model="toDark" class="mt-2 theme-switch" inline-prompt :active-icon="Sunny" :inactive-icon="Moon"
        @change="themeToggle" />
</template>
<script setup>
import { computed, onMounted, provide, reactive, ref } from 'vue'
import { Moon,Sunny } from '@element-plus/icons-vue'

const root = document.documentElement;
const $size = ref('');
const $theme = ref('light');
provide('$size', $size);
provide('$theme', $theme);
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
let toDark = ref('')
const themeToggle = () => {
    const currentTheme = root.getAttribute('data-theme');
    if (!currentTheme || currentTheme == 'dark') {
        root.setAttribute('data-theme', 'light')
        $theme.value = 'light'
    } else if (currentTheme == 'light') {
        root.setAttribute('data-theme', 'dark')
        $theme.value = 'dark'

    }
    toDark = !toDark
    console.log(111, root.getAttribute('data-theme'));
}
onMounted(() => {
    toDark.value = $theme && $theme == 'light' ? true : false;
})
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    font-family: "Nunito", "Segoe UI", arial;
}

html {

    &::-webkit-scrollbar {
        width: 6px;
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
img{
    user-select: none;
}

[data-theme='light'] .theme-switch{
    svg{
        color:#3b10da;
    }
}
[data-theme='dark'] .theme-switch{
    svg{
        color: rgb(255, 253, 148);
    }
}
.theme-switch{
    position: fixed;
    bottom: 10px;
    right: 2.2rem;
}
</style>
