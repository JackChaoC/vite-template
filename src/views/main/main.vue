<template>
    <div class="main full-both" ref="el_main">

        <!-- fixed -->
        <div class="aside">
            <el-row class="title">
                <el-col :span="6" class="title-img">
                    <img src="@/assets/image/planet.png">
                </el-col>
                <el-col class="title-right" :span="18">
                    <span>逐日</span>
                    <img class="icon-aside-check" v-show="$size > 4"
                        :src="ischecked ? checkIconUrl.checked : checkIconUrl.unchecked" @click="asideChcek()">
                    <img class="icon-close" v-show="$size < 5" src="@/assets/icon/close.png" @click="asideToggle()">
                </el-col>
            </el-row>

            <div class="node" v-for="item_f in directory">
                <p v-if="item_f.node > ''">{{ item_f.node }}</p>
                <div class="aside-item" v-for="item_s in item_f.children"
                    :class="[item_s.routeName == activeRoute ? 'aside-item-checked' : '']"
                    @click="naviTo(item_s.routeName)">
                    <img :src="item_s.routeName == activeRoute ? item_s.imgSelected : item_s.img" draggable="false">
                    <span>{{ item_s.name }}</span>

                </div>
            </div>
        </div>
        <!-- fixed -->
        <div class="navbar box" ref="el_navbar">
            <div class="navbar-left">

                <img v-show="$size < 5" src="@/assets/icon/menu.png" class="icon-menu" @click="asideToggle()">
            </div>
            <div class="navbar-right">
                <div v-show="$size > 1">
                    <p class="username">JackChaoC</p>
                    <p class="e-mail">51727388414@qq.com</p>
                </div>
                <el-dropdown trigger="click" @command="dropdownHandler">
                    <img src="@/assets/image/planet.png" class="profile">
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="item in dropDownItem" :command="item.id" :icon="item.icon">{{
                                item.label }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
        <div class="mask">
        </div>
        <!-- flex,固定宽度 -->

        <div class="aside-placehoder">
        </div>
        <div class="content">

            <!-- flex，flex=1 -->
            <router-view></router-view>
        </div>
    </div>
    <button class="box btn" style="position: fixed; bottom: 60px;right: 100px;" @click="themeToggle">toggle
        theme</button>
</template>

<script setup>
import $request from '@/http/request'
import { onMounted, ref, watch, inject, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { SwitchButton } from '@element-plus/icons-vue'

const router = useRouter();
const route = useRoute();

const message = ref('Hello, Vue 3!');
const getList = () => {
    $request.get(`/list/selectList/0`).then(res => {
        console.log('成功获取issue_lists:', res.data);
    }).catch(err => {
        console.log('获取issue_lists失败！' + err);
    })
}
const getImgUrl = (url) => { return new URL(url, import.meta.url).href }
const checkIconUrl = ref({
    checked: getImgUrl('/src/assets/icon/checked.png'),
    unchecked: getImgUrl('/src/assets/icon/unchecked.png'),
})
const directory = ref([
    {
        children: [
            {
                img: getImgUrl('/src/assets/icon/home.png'),
                imgSelected: getImgUrl('/src/assets/icon/home-selected.png'),
                routeName: 'home',
                name: '首页'
            },
            {
                img: getImgUrl('/src/assets/icon/store.png'),
                imgSelected: getImgUrl('/src/assets/icon/store-selected.png'),
                routeName: 'store',
                name: '商店'
            },
        ]
    }, {
        node: '节点1',
        children: [
            {
                img: getImgUrl('/src/assets/icon/account.png'),
                imgSelected: getImgUrl('/src/assets/icon/account-selected.png'),
                routeName: 'account',
                name: '我的账号'
            },
            {
                img: getImgUrl('/src/assets/icon/wallet.png'),
                imgSelected: getImgUrl('/src/assets/icon/wallet-selected.png'),
                routeName: '钱包',
                name: 'wallet'
            },
        ]
    },
    {
        node: '节点2',
        children: [
            {
                img: getImgUrl('/src/assets/icon/tutorial.png'),
                imgSelected: getImgUrl('/src/assets/icon/tutorial-selected.png'),
                routeName: 'tutorial',
                name: '教程'
            },
            {
                img: getImgUrl('/src/assets/icon/problem.png'),
                imgSelected: getImgUrl('/src/assets/icon/problem-selected.png'),
                routeName: 'problem',
                name: '常见问题'
            },
        ]
    },
    {
        node: '节点3',
        children: []
    },
]);

const dropDownItem = [
    {
        label: 'Action 1',
        icon: null,
        id: 'a1'
    },
    {
        label: 'Action 2',
        icon: null,
        id: 'a2'

    },
    {
        label: '推出登录',
        icon: SwitchButton,
        id: 'logout'
    },
]

const el_main = ref(null)
const el_navbar = ref(null)
const root = document.documentElement;
const root_asideWidth = getComputedStyle(root).getPropertyValue('--aside-width');

//listen $size
const $size = inject('$size')
const setRootProperty_header = (value) => {
    root.style.setProperty('--header-sub', value);
}
watch($size, (newVal, oldVal) => {
    console.log(111);

    if (newVal > 4) {
        console.log('变大');

        el_main.value.classList.remove('showaside')
        setRootProperty_header(root_asideWidth)

    }
    if (newVal < 5) {
        console.log('变小');

        setRootProperty_header('0rem')
    }
    ischecked.value = true
    el_main.value.classList.remove('simplifyaside')

})


//aside-simplify
let ischecked = ref(true)
const asideChcek = () => {
    el_main.value.classList.toggle('simplifyaside')
    ischecked.value = !ischecked.value
}
//aside-show/hide
const asideToggle = () => {
    if ($size.value < 5) {
        el_main.value.classList.toggle('showaside')
    }
}
//navigation
const activeRoute = ref('')
const naviTo = (name) => {
    router.push({
        name: name,
    })
    activeRoute.value = name
}

//dropdown
const dropdownHandler = (id) => {
    console.log(id);
    
}   

//theme
const themeToggle = () => {

    const currentTheme = root.getAttribute('data-theme');
    console.log(111, currentTheme);
    if (!currentTheme || currentTheme == 'dark') {
        console.log(222);

        root.setAttribute('data-theme', 'light')
    } else if (currentTheme == 'light') {
        root.setAttribute('data-theme', 'dark')
    }
}

onMounted(() => {
    root.setAttribute('data-theme', 'light')

    if ($size.value < 5) {
        setRootProperty_header('0rem')
    }
    const arr = route.path.split('/')
    activeRoute.value = arr[arr.length - 1]

})
</script>

<style lang="scss" scoped>
$aside-width: var(--aside-width);
$aside--item-width: 12rem;
$aside-width-simplify: var(--aside-width-simplify);

//小于1200时
@media (max-width: 1200px) {
    .aside {
        transform: translateX(-16rem);
        opacity: 0;
    }

    .aside-placehoder {
        width: 0;
    }

}

//大于1200时
@media (min-width: 1200px) {

    .aside-placehoder {
        width: $aside-width;
    }
}

.main {
    display: flex;
    background-color: var(--theme-color-background);
    transition: $transition-background-color;

    .aside {
        background-color: var(--theme-color-content);
        position: fixed;
        box-shadow: $shadow;
        padding: $padding;
        padding-top: 0;
        box-sizing: border-box;
        height: inherit;
        width: $aside-width;
        z-index: 999;
        transition: $transition;
        overflow: hidden;

        .title {
            padding: .6rem 0;
            margin-right: .2rem;
            margin-bottom: .4rem;
            width: 14rem;

            .title-img {
                text-align: center;

                img {
                    margin-right: .2rem;
                    width: $font-size-3*1.9;
                }

            }

            .title-right {
                line-height: 2em;
                /* 渐变色 */
                background: $color-primary-linear;
                /* 背景裁剪为文字 */
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: $font-size-3;
                font-weight: $font-weight-thick;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .icon-aside-check,
                .icon-close {

                    width: .85em;
                    height: .85em;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .icon-aside-check :hover {
                    @include shadow-primary(.5)
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
    // @extend .box;
    transition: transform 0.25s ease-in-out;

    &:hover img {
        padding-left: 30px;
    }


    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: $font-size-2;
    font-weight: $font-weight-regular;
    color: var(theme-color-text-gray);
    line-height: 2em;
    padding: .3rem 1rem;
    margin: .2rem 0;
    height: 2em;
    width: $aside--item-width; //固定宽度，防止行内元素变动（width=$aside-width-4rem
    cursor: pointer;

    img {
        width: 1.3em;
        height: 1.3em;
        transition: $transition;
    }

    span {
        color: var(--theme-color-text);
        margin-left: 10px;
        display: inline-block;
    }


}

.node {
    p {
        padding: 8px $padding-regular;
        color: var(theme-color-text);
        font-size: $font-size-1;
    }
}

.navbar {
    position: fixed;
    right: 0;
    margin: 1rem 2.2rem 0;
    width: calc(100% - var(--header-sub) - 4.4rem);
    box-sizing: border-box;
    padding: $padding-regular;
    height: 4rem;
    z-index: 998;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: $transition-background-color;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

    .navbar-left {
        margin: .2rem;
        margin-left: .5rem;
        display: flex;
        align-items: center;

        .icon-menu {
            width: 1.6rem;
            height: 1.6rem;
            cursor: pointer;
        }

    }

    .navbar-right {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .username {
            font-size: $font-size-1;
            color: var(theme-color-text-gray);
            font-weight: 600;
        }

        .e-mail {
            font-size: $font-size-1;
            color: var(theme-color-text);
        }

        .profile {
            margin-left: .5rem;
            width: 2.8rem;
            margin-right: .5rem;
        }
    }
}

.mask {
    position: fixed;
    right: 0;
    width: calc(100% - var(--header-sub));
    height: 5rem;
    z-index: 997;
    background-color: var(--theme-color-background);
    opacity: .9;
    transition: $transition-background-color;

}

.aside-placehoder {
    height: 100%;
    transition: $transition;
}

.content {
    padding: 2rem 2.2rem 0;
    box-sizing: border-box;
    transition: $transition;
    flex: 1;
    margin-top: 5rem;
    min-height: calc(100vh - 5rem);
    z-index: 0;
}




.showaside {

    .aside {
        transform: translateX(0);
        opacity: 1;
    }

    // --header-sub:#{$aside-width};

}

.simplifyaside {
    .aside {
        width: $aside-width-simplify;

        .title .title-right {
            visibility: hidden;
        }

        .aside-item span {
            visibility: hidden;

        }

        &:hover {
            width: $aside-width;

            .title .title-right {
                visibility: visible;
            }

            .aside-item span {
                visibility: visible;
            }

        }

        &:hover .aside-item {
            width: $aside--item-width;

        }

    }

    .aside-item {
        width: auto;
    }

    .aside-placehoder {
        width: $aside-width-simplify;
    }

    --header-sub:#{$aside-width-simplify};
}

.aside-item-checked {
    background: $color-primary-linear;
    box-shadow: 0 0 10px 1px $color-primary;
    border-radius: 4px;

    span {
        color: #fff;
    }
}
</style>
