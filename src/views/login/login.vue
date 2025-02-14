<template>
    <div class="login">
        <div class="content box">
            <div class="title">
                <img src="@/assets/image/planet.png">
                <span>逐日</span>
            </div>
            <p class="h1">Start here JC! 🚀</p>
            <p class="h2">some discription</p>
            <p class="label">邮箱</p>
            <input class="username input" v-model="data.user.email" type="account" />
            <p class="label">密码</p>
            <input class="password input" v-model="data.user.password" type="password" />
            <button class="btn" @click="postLogin">登录</button>
            <p class="to-register">还没有账号？ <span @click="router.push({ name: 'register' })">马上注册 👉</span></p>
        </div>

    </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '@/http/request.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = ref('Hello, Vue 3!');
const data = reactive({
    user: {
        email: '',
        password: ''
    }
})

const postLogin = async () => {
    try {
        const res = await request.post('/authorization/login', {
            user_email: data.user.email,
            user_password: data.user.password
        });
        console.log(res);
        router.push({
            name: 'home'
        });
        ElMessage.success('登陆成功')
    } catch (err) {
        console.log(err);
    }

}
onMounted(() => {

    console.log(document.cookie);
})

</script>

<style scoped lang="scss">
/* Add your styles here */
* {
    font-size: 13px;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: var(--theme-color-background);
    color: var(--theme-color-text);

    .content {
        min-width: 25rem;
        height: auto;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;

        .title {
            align-self: center;
            display: flex;
            align-items: center;
            margin: 5px 0 20px;

            $f-size: 1.6rem;

            img {
                width: $f-size * 1.9;
                margin-right: 10px;
            }

            span {
                font-size: $f-size;
                font-weight: 600;
                @include text-color-linear;

            }
        }

        .h1,
        .h2 {
            margin-left: 3px;
            line-height: 1.5em;
        }

        .h1 {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 5px;
        }

        .h2 {
            margin-bottom: 10px;
        }

        .account,
        .password {}



        .btn {
            margin: 1rem 0;
        }

        .to-register {
            align-self: center;

            span {
                color: $color-primary;
                cursor: pointer;
            }
        }

    }
}

.input {
    margin-bottom: 1rem;
    font-size: 14px;

}

.label {
    margin: 3px;
    font-size: 13px;
}
</style>