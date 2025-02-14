<template>
    <div class="switch" @click="switchHandle" :style="{
        backgroundColor: props.modelValue ? props.bgColorOn : props.bgColorOff
    }">
        <div class="button" :class="[props.modelValue ? 'button-on' : '']" @click.stop="switchHandle" :style="{
            transition: props.transition,
            backgroundColor: props.modelValue ? props.btnColorOn : props.btnColorOff
        }">
            <img :src="props.modelValue ? props.imgOn : props.imgOff" :style="{
                width: props.modelValue ? props.sizeOn : props.sizeOff,
                height: props.modelValue ? props.sizeOn : props.sizeOff
            }" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits();
const props = defineProps({
    modelValue: { // 接收来自父组件的 `v-model` 绑定的值
        type: Boolean,
        default: false,
        required: true
    },
    imgOff: {
        type: String
    },
    imgOn: {
        type: String
    },
    sizeOff: {
        type: String,
    },
    sizeOn: {
        type: String,
    },
    transition: {
        type: String,
        default: 'transform .2s'
    },
    btnColorOff: {
        type: String,
        default: '#fff'
    },
    btnColorOn: {
        type: String,
        default: '#fff'
    },
    bgColorOff: {
        type: String,
        default: '#F8F8F8'
    },
    bgColorOn: {
        type: String,
        default: '#F8F8F8'
    },
});
const switchHandle = () => {
    emit('update:modelValue', !props.modelValue);
    emit('change');
}



</script>

<style scoped lang="scss">
.switch {
    height: 1rem;
    width: 2.5rem;
    border-radius: .5rem;
    overflow: visible;
    box-shadow: 0 0 5px 3px #4d4d4d2c;
    cursor: pointer;

    .button {
        width: 1.5rem;
        height: 1.5rem;
        background-color: var(--theme-color-content);
        border-radius: 50%;
        box-shadow: 1px 1px 5px 3px #39393929;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translateY(-50%);
        transition: $transition;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
}

.button-on {
    transform: translate(100%, -50%) !important;
}
</style>