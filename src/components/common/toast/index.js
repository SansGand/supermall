// 封装toast插件
import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    console.log('use调用时会执行install，默认传入Vue');
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
        //2.通过new的方式，创建一个组件对象
    const toast = new toastContrustor()
        //3.将组件对象，手动挂载到某一个元素上
        //document.createElement('div')会被替换成toast里的
    toast.$mount(document.createElement('div'))
        //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el) //添加组件dom元素
        //将组件对象添加到Vue原型
    Vue.prototype.$toast = toast //添加组件方法
}

export default obj