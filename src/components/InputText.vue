<template>
    <input class="input" :type="type" v-model="value">
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    value: null,
    type:{
        type: String,
        default: 'text'
    },
    validator: Function
})

</script>

<style scoped>
/* Add your styles here */
</style>