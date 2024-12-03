<template>
    <div class="home">
        <div class="aside" ref="el_aside">
            <el-row class="title">
                <el-col :span="6">
                    <img src="@/assets/image/bird.png">
                </el-col>
                <el-col class="title-right" :span="18">
                    <span>逐日</span>
                    <img class="hover" :src="ischecked ? checkIconUrl.checked : checkIconUrl.unchecked"
                        @click="asideChcek()">
                </el-col>
            </el-row>


            <div class="aside-item">
                <img src="@/assets/icon/main.png">
                <span>首页</span>
            </div>
            <div class="aside-item">
                <img src="@/assets/icon/store.png">

                <span>商店</span>


            </div>
            <div class="node" v-for="item_f in directory">
                <p>{{ item_f.node }}</p>
                <div class="aside-item" v-for="item_s in item_f.children">
                    <img :src="`@/assets/icon/${item_s[0]}.png`">
                    <span>{{ item_s[0] }}</span>

                </div>
            </div>
        </div>
        <div class="content" ref="el_content">
            <el-row class="header box">
                header
            </el-row>
            <button class="box btn-open" style="float: right" @click="asideToggle">open</button>
            <router-link :to="{ name: 'home' }"></router-link>
        </div>
    </div>
</template>

<script setup>
import $request from '@/http/request'
import { onMounted, ref, watch, inject, nextTick } from 'vue';
import axios from 'axios';
import { routeLocationKey } from 'vue-router';

const message = ref('Hello, Vue 3!');
const getList = () => {
    $request.get(`/list/selectList/0`).then(res => {
        console.log('成功获取issue_lists:', res.data);
    }).catch(err => {
        console.log('获取issue_lists失败！' + err);
    })
}
const checkIconUrl = ref({
    checked: new URL('@/assets/icon/checked.png', import.meta.url).href,
    unchecked: new URL('@/assets/icon/unchecked.png', import.meta.url).href,
})
const directory = ref([
    {
        node: '节点1',
        children: [
            ['account', '我的账号'],
            ['wallet', '钱包']
        ]
    },
    {
        node: '节点2',
        children: [
            ['tutorial', '教程'],
            ['problem', '常见问题']
        ]
    },
    {
        node: '节点3',
        children: []
    },
]);

//listen $size
const $size = inject('$size')

//aside-check
let ischecked = ref(false)
const asideChcek = () => {
    ischecked.value = !ischecked.value

}
//aside-show/hide
const el_aside = ref(null)
const el_content = ref(null)
const asideToggle = () => {
    if ($size.value < 5) {
        console.log(el_aside.value);
        el_aside.value.classList.toggle('showaside')
        el_content.value.classList.toggle('showaside-content')
    }
}
onMounted(() => {

})
watch($size, (newVal, oldVal) => {


    if (newVal > 4) {
        console.log(el_aside.value);
        el_aside.value.classList.remove('showaside')
        el_content.value.classList.remove('showaside-content')
    }

})



// Add your component logic here
</script>



<style lang="scss" scoped>
$aside-width: var(--aside-width);


.home {
    background-color: $color-background;
    display: flex;
    height: 100vh;
    width: 100%;

    .aside {
        background-color: $color-content;
        position: fixed;
        box-shadow: $shadow;
        padding: $padding;
        padding-top: 0;
        box-sizing: border-box;
        height: inherit;
        min-width: $aside-width;
        z-index: 3;
        transition: all 0.25s ease;

        .title {
            padding: .6rem;
            padding-left: 0;
            margin-bottom: .4rem;

            img {
                width: $font-size-3*1.9;
            }

            .title-right {
                height: 2em;
                line-height: 2em;
                color: $color-primary;
                font-size: $font-size-3;
                font-weight: $font-weight-thick;
                display: flex;
                justify-content: space-between;
                align-items: center;

                img {
                    width: .85em;
                    height: .85em;
                    border-radius: 50%;

                    &:hover {
                        box-shadow: 0 0 15px 5px #cff4fc7a;
                    }
                }
            }
        }

        .aside-item>p {
            font-size: $font-size-1;
            font-weight: $font-weight-regular;

        }
    }

    .aside-item {
        @extend .box;
        transition: all 0.25s ease-out;

        &:hover {
            padding-left: 40px;
        }

        height: 2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: $font-size-2;
        font-weight: $font-weight-regular;
        color: $text-color-gray;
        line-height: 2em;
        padding: .3rem 1rem;
        margin: .2rem 0;
        cursor: pointer;

        img {
            width: 1.3em;
            height: 1.3em;
        }

        span {
            margin-left: 10px;
            display: inline-block;
        }


    }

    .node {
        p {
            padding: 8px $padding-regular;
            color: $text-color-gray-light;
            font-size: $font-size-1;
        }
    }

    .content {
        flex: 1;
        height: inherit;
        background-color: $color-background;
        transition: all 0.25s ease;
        box-sizing: border-box;
        padding: $padding 2.2rem;
        margin-left: $aside-width;

        .header {
            height: 64px;
        }
    }
}

//小于768时
@media (max-width: 1200px) {
    .aside {
        transform: translateX(-16rem);
        opacity: 0;
    }

    .home>.content {
        margin-left: 0;
    }
}

.showaside {
    transform: translateX(0);
    opacity: 1;
}

.showaside-content {
    margin-left: $aside-width;
}
// .showaside {
//     .aside
// }

// .simplifyaside {
//     .aside{
//         .aside-item{
//             background-color: #f01d1d;
//         }
//     }

//     .content{

//     }
// }


</style>
