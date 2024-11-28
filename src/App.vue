<template>
    <div class="app">
        <div class="directory"></div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { onMounted} from 'vue'
onMounted(() => {
    
})
</script>

<style scoped>
html,
body {
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
}
.app{
    display: flex;
    flex-direction: row;
    height: 100%;
}
</style>
