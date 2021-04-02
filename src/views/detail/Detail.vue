<!-- 商品详情页面 -->
<template>
  <div id="detail">
    <detail-nav-bar @itemClick="itemClick" ref="navBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
      <detail-swiper :top-images="topImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :params-info="paramsInfo" ref="paramsInfo"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommenInfo" ref="recommenInfo"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 组件默认不支持原生事件 需要加上.native监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {getDetailSwiper,getRecommend,Goods,Shop,GoodsParam} from "network/detail"
import {debounce} from 'common/util'
import {imgListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommenInfo: [],
      scrollTopYs: [],
      getScrollTopYs: null,
      currentIndex: 0
    }
  },
  // vue重复代码的混入
  mixins: [imgListenerMixin,backTopMixin],
  created() {
    this.iid = this.$route.params.iid

    getDetailSwiper(this.iid).then(res => {
      // console.log(res);
      //获取顶部轮播图数据
      this.topImgs = res.result.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
      //获取店铺信息
      this.shops = new Shop(res.result.shopInfo)
      //商品图片展示
      this.detailInfo = res.result.detailInfo
      //参数信息
      this.paramsInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
      //评论信息
      if(res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0]
      }
    })
    //获取推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommenInfo = res.data.list
    })

    //防止多次获取，利用防抖，在图片全部加载完成后获取一次
    this.getScrollTopYs = debounce(() => {
      this.scrollTopYs = []
      this.scrollTopYs.push(0)
      this.scrollTopYs.push(this.$refs.paramsInfo.$el.offsetTop)
      this.scrollTopYs.push(this.$refs.commentInfo.$el.offsetTop)
      this.scrollTopYs.push(this.$refs.recommenInfo.$el.offsetTop)
      //往数组添加个很大的值，防止后面判断条件过于复杂
      this.scrollTopYs.push(Number.MAX_VALUE)
    },100)
  },
  mounted() {
    
  },
  destroyed() {
    //关闭detail组件推荐图片goodsitem事件总线监听
    this.$bus.$off('imageLoad',this.imgListener)
  },
  methods: {
    imageLoad() {
      //利用防抖函数防止refresh频繁调用
      this.newRefresh()
      //图片全部加载完成后才获取各个组件的offsetTop值
      this.getScrollTopYs()
    },
    itemClick(index) {
      //点击跳到对应的组件
      this.$refs.scroll.scroll.scrollTo(0,-this.scrollTopYs[index],500)
    },
    //内容滚动，显示正确的导航
    detailScroll(position){
      // if-else分支太多
      // if(0 <= -position.y && -position.y < this.scrollTopYs[1]){
      //   this.$refs.navBar.currentIndex = 0
      // }else if(this.scrollTopYs[1]<= -position.y && -position.y < this.scrollTopYs[2]){
      //   this.$refs.navBar.currentIndex = 1
      // }else if(this.scrollTopYs[2]<= -position.y && -position.y <this.scrollTopYs[3]){
      //   this.$refs.navBar.currentIndex = 2
      // }else if(-position.y >= this.scrollTopYs[3]){
      //   this.$refs.navBar.currentIndex = 3
      // }
      //判断条件太复杂
      // for(let i=0;i<this.scrollTopYs.length;i++){
      //   if((i < this.scrollTopYs.length-1 && -position.y >= this.scrollTopYs[i] && -position.y < this.scrollTopYs[i+1]) || (i=== this.scrollTopYs.length-1 && -position.y >= this.scrollTopYs[i])) {
      //     this.$refs.navBar.currentIndex = i
      //   }
      // }
      //hack做法 往数组最后添加个最大值
      for(let i=0;i<this.scrollTopYs.length-1;i++){
        if(this.currentIndex !== i && -position.y >= this.scrollTopYs[i] && -position.y < this.scrollTopYs[i+1]) {
          //防止频繁执行
          this.currentIndex = i
          // console.log(this.currentIndex );
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }

      //控制返回顶部按钮的显隐
      this.isShow = -position.y > 1000
    },
    //添加到购物车
    addToCart(){
      //1.获取购物车需要展示的信息
      const carts = {}
      carts.iid = this.iid 
      carts.image = this.topImgs[0]
      carts.title = this.goods.title
      carts.desc = this.goods.desc
      carts.price = this.goods.realPrice
      //2.添加到购物车
      this.$store.dispatch('addCartsList',carts).then(() => {
        this.$toast.show('添加成功')
      })
    }
  }
}
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
