import { debounce } from 'common/util'
import BackTop from 'components/content/backTop/BackTop'

export const imgListenerMixin = {
    data() {
        return {
            imgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        //调用函数加()为返回值，不加()为函数对象
        //防抖，防止频繁执行refresh
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500)

        //多次调用，都是用的同一个refresh，不会销毁也不会创建新的
        //图片全部加载完成后调用refresh并用一个变量保存
        this.imgListener = () => {
            this.newRefresh()
        }

        //事件总线监听图片加载事件
        this.$bus.$on('imageLoad', this.imgListener)
            // console.log(this.$route.path + "mixin");
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        //返回顶部
        backClick() {
            //this.$refs.scroll获取Scroll组件
            //然后获取组件data里定义的srcoll，调用scrollTo方法
            //scrollTo(x, y, time) 横轴坐标，纵轴坐标，滚动动画执行时长
            this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        },
    }
}