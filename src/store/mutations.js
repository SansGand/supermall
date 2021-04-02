import { ADD_COUNT, ADD_LIST, SELECT_CHECK } from './mutation-types'

export default {
    //默认第一个传入state，第二个是传递的参数
    //已存在就添加数量
    [ADD_COUNT](state, payload) {
        payload.count++
    },
    //添加到购物车
    [ADD_LIST](state, payload) {
        state.cartsList.push(payload)
    },
    selectCheck(state, payload) {
        payload.checked = !payload.checked
    }
}