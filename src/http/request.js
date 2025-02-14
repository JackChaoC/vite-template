import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '@/router/index.js';
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3 * 1000,
    // axios不需要配置请求头，自动检测json/multipart，加了之后接口中的请求头设置无效
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    // console.log('响应拦截器config->', config);
    const token = getCookie('名称');
    if (token) {
        config.params = { 'token': token }
        config.headers.token = token;
    }

    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
    // console.log('响应拦截器response->', response);

    const { url } = response.config;
    const { code, message, data } = response.data;
    let errMsg = '';

    if (url.split('/')[1] == 'authorization') {
        console.log('跳过登录验证');
        return data
    }

    if (code == null) {
        errMsg = 'no code'
    } else {
        switch (code) {
            case 200:
                return data
            case 0:
                errMsg = message || '已访问到服务器，但是操作失败'
                break;
            case 20001:
                router.push({
                    name: 'login'
                })
                errMsg = '访问成功但是未登录处理'
                break;
            default:
                errMsg = data.message || '未知错误'
        }
    }

    if (errMsg) {
        ElMessage.warning(errMsg)
        return Promise.reject(new Error(errMsg));
    }

}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '400 错误请求'
                break;
            case 401:
                error.message = '401 未授权，请重新登录'
                break;
            case 403:
                error.message = '403 拒绝访问'
                break;
            case 404:
                error.message = '404 请求错误,未找到该资源'
                // window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '405 请求方法未允许'
                break;
            case 408:
                error.message = '408 请求超时'
                break;
            case 500:
                error.message = '500 服务器端出错'
                break;
            case 501:
                error.message = '501 网络未实现'
                break;
            case 502:
                error.message = '502 网络错误'
                break;
            case 503:
                error.message = '503 服务不可用'
                break;
            case 504:
                error.message = '504 网络超时'
                break;
            case 505:
                error.message = '505 http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
        ElMessage.error(error.message)
        console.log(error);
        const { code, sql } = error.response.data
        console.log(`code: ${code || ''}\nsql: ${sql || ''}`);
    }
    return Promise.reject(error)
})
export default service