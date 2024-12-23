import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    base: '/vite-template-swal',//nginx静态资源访问路径，与AJAX请求路径不同！
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }), 
    ],
    build: {
        outDir: 'vite-template-swal', // 修改为你想要的目录名
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 配置 '@' 别名
        },
    },
    css: {
        preprocessorOptions: {
            // 全局样式引入
            scss: {
                additionalData: '@use "@/assets/css/default.scss" as *;',
                api: 'modern-compiler'
            }
        }
    }
});
