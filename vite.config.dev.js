import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),],
    server: {
        hmr: {
            // 自定义 HMR 选项，例如：
            protocol: 'ws',
            port: 3001
        },
        proxy: {
            // 在此处编写代理规则
            '/api': {
                target: 'http://localhost:3000/todolist',
                changeOrigin: true,
                rewrite: (path) => {
                    return path.replace(/\/api/, '')
                }
            }
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            // 全局样式引入
            scss: {
                additionalData: `
                    @use "@/assets/css/default.scss" as *;
                `,
                api: 'modern-compiler'
            }
        }
    }
})
