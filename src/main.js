import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//使用插件,use时会调用这个对象的install方法
Vue.use(toast)

//使用图片懒加载
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/loading.gif')
})

// 事件总线 类似于vuex的效果，只不过管理的是事件
Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')