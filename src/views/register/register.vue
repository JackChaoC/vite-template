<template>
    <div class="register">
        <div class="content box">
            <div class="title">
                <img src="@/assets/image/planet.png">
                <span>逐日</span>
            </div>
            <p class="h1">Start here JC! 🚀</p>
            <p class="h2">some discription</p>
            <p class="label">昵称</p>
            <input class="username input" v-model="data.user.name" type="text" />
            <p class="label">邮箱</p>
            <input class="email input" v-model="data.user.email" type="account" />
            <p class="label">密码</p>
            <input class="password input" v-model="data.user.password" type="password" />
            <p class="label">重复密码</p>
            <input class="password input" v-model="data.user.repeatPassword" type="password" />

            <el-checkbox class="custom-control" v-model="isApproveTerms" label="注册既然代表服务条款" size="large">
                <label>注册既代表同意 <el-link class="terms-link" @click="openTerms">服务条款</el-link></label>
            </el-checkbox>
            <button class="btn" @click="postLogin">注册</button>
            <p class="to-register">已有账号？ <span @click="router.push({ name: 'login' })">马上登录 👉</span></p>
        </div>

    </div>
    <el-dialog class="terms" v-model="dialogTableVisible" width="24rem">
        <div class="container">
            <h1>服务条款</h1>
            <p>本网站提供的内容仅供参考和一般信息使用，未经明确说明，不构成法律、财务、医疗或其他专业建议。我们尽最大努力确保信息的准确性和完整性，但无法保证内容在所有时间内的无误性、完整性或适用性。

                用户在访问本网站或使用相关服务时，需自行承担可能的风险。本网站对因使用或依赖本网站内容而导致的任何直接或间接损失概不负责。

                此外，您可能会通过本网站链接到其他第三方网站。这些链接仅为用户方便提供，我们对第三方网站的内容、准确性、隐私政策或其他任何事项不承担任何责任。

                在法律允许的最大范围内，本网站对任何类型的损害（包括但不限于数据丢失、业务中断或其他经济损失）不承担责任，无论其是由于合同、侵权行为还是其他原因造成的。

                通过使用本网站，您即表示同意本免责声明的内容。如您对本免责声明的任何部分有疑问或异议，请立即停止使用本网站。</p>
            <button class="btn" @click="approve">同 意</button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from '@/http/request.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = ref('Hello, Vue 3!');
const data = reactive({
    user: {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    }
})
//terms
const isApproveTerms = ref(false)
const dialogTableVisible = ref(false)
const openTerms = () => {
    dialogTableVisible.value = true;
}
const approve = () => {
    dialogTableVisible.value = false;
    isApproveTerms.value = true;
}
//api:register
const postLogin = async () => {
    try {
        const isvalid = validator()
        if (!isvalid) return;
        const res = await request.post('/authorization/register', {
            user_name: data.user.name,
            user_email: data.user.email,
            user_password: data.user.password
        });
        console.log(res);
        if (res.code == 200) {
            router.push({
                name: 'login'
            });
            ElMessage.success('注册成功')
        } else if (res.code == 0) {
            ElMessage.warning(`${res.message}`)
        }
    } catch (err) {
        console.log(err);
    }
}
const validator = () => {
    if (!data.user.name) {
        ElMessage.error('昵称不能为空')
        return false;
    }
    if (!data.user.email) {
        ElMessage.error('邮箱不能为空')
        return false;
    }
    if (!data.user.password) {
        ElMessage.error('密码不能为空')
        return false;
    }
    if (!data.user.repeatPassword) {
        ElMessage.error('请确认密码')
        return false;
    }
    if (data.user.password !== data.user.repeatPassword) {
        ElMessage.error('两次输入的密码不一致')
        return false;
    }
    if (!isApproveTerms.value) {
        ElMessage.error('请同意服务条款')
        return false;
    }
    return true;
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

.register {
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

        .custom-control {
            align-self: flex-start;

            label {
                color: var(--theme-color-text);

                .terms-link {
                    position: relative;
                    bottom: 2px;
                    color: var(--color-primary)
                }
            }

        }

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

.terms {
    .container {

        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-size: $font-size-3;
            margin-bottom: 1rem;
        }

        p {
            line-height: 1.5em;
            font-size: $font-size-2;
            text-indent: 2em;
            margin-bottom: 1rem;
        }

        .btn {
            width: 6rem;
        }
    }
}
</style>