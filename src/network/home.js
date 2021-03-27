import { request } from './request'

//首页所有的请求

//首页轮播图、推荐数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

//首页商品详情的数据
export function getHomeGoods(type, page) {
    return request({
        url: 'home/data',
        params: {
            type,
            page
        }
    })
}