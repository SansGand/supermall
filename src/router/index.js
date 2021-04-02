import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Home = () =>
    import ('views/home/Home');
const Category = () =>
    import ('views/category/Category');
const Shopcar = () =>
    import ('views/shopcar/Shopcar');
const Profile = () =>
    import ('views/profile/Profile');
const Detail = () =>
    import ('views/detail/Detail');

//1.安装插件
Vue.use(VueRouter)

//2.创建并导出router
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/shopcar',
        component: Shopcar
    }, {
        path: '/profile',
        component: Profile
    }, {
        path: '/detail/:iid',
        component: Detail
    }],
    mode: 'history'
})