import axios from 'axios'

//封装axios
//这样就不需要每个组件都去引用axios，后期一旦替换axios，工程量太大

//4.instance本身返回值就是Promise
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //2.axios拦截器
    //请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        //什么时候使用
        //1.比如config中的一些信息不符合服务器的要求
        //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        //3.某些网络请求(比如登录(token))，必须携带一些特殊的信息

        //拦截后，要返回出去，不然外面拿不到
        return config;
    }, err => {

    })

    //响应拦截
    instance.interceptors.response.use(res => {
        //必须要返回出去
        return res.data
    }, err => {

    })

    //3.发送请求
    return instance(config)
}