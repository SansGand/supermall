import { request } from './request'

//详情页请求
export function getDetailSwiper(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

//推荐数据
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

//自定义数据类型
//商品信息
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//店铺信息
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

//参数信息
export class GoodsParam {
    constructor(info, rule) {
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}