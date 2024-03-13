import axios from 'axios';
import qs from 'qs';

//axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// axios.defaults.timeout = 16000;//上传大文件取消默认
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded;charset=UTF-8';

// post传参序列化
const interceptor = axios.interceptors.request.use(
  function(config) {
    if (config.headers.other) {
      // config.baseURL = 'http://zktp.zzdingyun.com';
      config.baseURL = 'http://zhukuaitp.zzdingyun.com';
    }
    // Do something before request is sent
    // console.log(config)
    if (config.method == 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },

  function(error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  },
);

window.addEventListener('unhandledrejection', event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  event.preventDefault();
  // 通过addEventListener绑定的事件，不能通过return false来阻止默认行为
});

// window.onunhandledrejection = event => {
//   console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
//   event.preventDefault();
//   // 或 return false
// };

window.sessionStorage.setItem('interceptorId', interceptor);
//添加请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     // 在发送请求之前做些什么
// return config;
//   },
//   function(error) {
//     console.log(error);
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   },
// );

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // window.history.pushState(null, null, "/login")
    console.log('响应拦截器错误信息');
    console.log(error);
    // if(error.response.data.status==401){
    //   Dialog('会话过期,请重新登录').then(action => {
    //     Router.push({path:'/login'})
    //   });
    // }
    return Promise.reject(error.response);
  },
);

export default axios;
export { interceptor };
