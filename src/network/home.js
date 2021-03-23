import { request } from './request'

//首页所有的请求

//请求首页轮播图、推荐数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}