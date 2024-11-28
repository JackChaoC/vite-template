<template>
    home!
    <button @click="getList()">getList</button>
</template>

<script setup>
import $request from '@/http/request'
import { ref } from 'vue';
import axios from 'axios';

const message = ref('Hello, Vue 3!');
const getList = () => {
    $request.get(`/list/selectList/0`).then(res => {
        console.log('成功获取issue_lists:', res.data);
    }).catch(err => {
        console.log('获取issue_lists失败！' + err);
    })
}

// Add your component logic here
</script>

<style scoped>
/* Add your styles here */
</style>