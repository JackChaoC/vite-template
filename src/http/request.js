/****   request.js   ****/
// 导入axios
import axios from 'axios'
// 使用element-ui Message做消息提醒
import { ElMessage } from 'element-plus';
import router from '../router';
// 示例的 getCookie 函数
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: import.meta.env.VITE_BASE_URL,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000,
  // axios不需要配置请求头，自动检测json/multipart，加了之后接口中的请求头设置无效
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  console.log('config',config);

  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // config.data = JSON.stringify(config.data); 

  //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
  const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
  if (token) {
    config.params = { 'token': token } //如果要求携带在参数中
    config.headers.token = token; //如果要求携带在请求头中
  }

  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  console.log('响应拦截器->', response);
  if (response.config.url.split('/')[1] == 'authorization') {
    console.log('跳过登录验证');
    return response.data
  }
  if (response.data.code == 1) {
    ElMessage.warning('请登录')
    router.push({
      name: 'login'
    })
    return Promise.reject('需登录')
  }
  return response.data
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      ElMessage.error('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败'
    console.log(error);
  }

  ElMessage.error(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  Promise.reject(error)
})
//4.导入文件
export default service