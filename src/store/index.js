import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
    //相当于组件data
    state: {
        cartsList: []
    },
    //相当于组件methods(但只能是同步操作)
    //唯一目的就是修改state中的状态
    //每个方法尽可能完成的事情比较单一一点
    mutations,
    //复杂操作和异步操作
    actions,
    //相当于computed
    getters
})

//导出
export default store