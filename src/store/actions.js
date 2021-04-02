import { ADD_COUNT, ADD_LIST } from './mutation-types'

export default {
    //默认第一个传入context，第二个是传递的参数
    addCartsList(context, payload) {
        //find() 
        //返回满足函数内判断的第一个元素值，只返回第一个符合的，之后的
        //元素不再调用函数
        let cart = context.state.cartsList.find((item) => {
            return item.iid === payload.iid
        })
        if (cart) {
            // cart.count += 1
            context.commit(ADD_COUNT, cart)
        } else {
            payload.count = 1
            payload.checked = true //默认选中
                // context.state.cartsList.push(payload)
            context.commit(ADD_LIST, payload)
        }
    }
}