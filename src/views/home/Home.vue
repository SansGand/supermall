<!-- 首页模块 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="tabControlFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="sImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl" v-show="!tabControlFixed"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- .native监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/util'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  created() {//尽量只写主要逻辑
    //请求首页轮播图、推荐数据
    this.getHomeMultidata()

    //商品详情的数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //调用函数加()为返回值，不加()为函数对象
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //事件总线监听图片加载事件
    this.$bus.$on('imageLoad',() => {
      //图片全部加载完成后调用refresh
      refresh()
    })
  },
  //只有组件在keep-alive内时，才会有这两个函数
  //进入组件时触发
  activated() {
    //重新定位到y坐标去，并刷新scroll
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  //离开组件时触发
  deactivated() {
    //记录离开时的y坐标
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {//具体实现方法
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      //让两个tabControl保持选中是一样的
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },
    //返回顶部
    backClick() {
      //this.$refs.scroll获取Scroll组件
      //然后获取组件data里定义的srcoll，调用scrollTo方法
      //scrollTo(x, y, time) 横轴坐标，纵轴坐标，滚动动画执行时长
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //监听页面滚动
    contentScroll(position) {
      //控制返回顶部按钮的显隐
      this.isShow = -position.y > 1000

      //控制tabControl是否吸顶
      this.tabControlFixed = -position.y > this.tabControlOffsetTop
    },
    //上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //获取tabControl的offsetTop
    sImgLoad(){
      //$el：获取组件中的元素
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        //es6语法 ...扩展运算符
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {//流行、新款、精选
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]}
      },
      currentType: 'pop',
      isShow: false,
      tabControlOffsetTop: 0,
      tabControlFixed: false,
      saveY: 0
    }
  }
}
</script>

<style  scoped>
#home {
  /* 
  vh:视口单位，1vh=视口高度的1%
  vw:1vw=视口宽度的1%
  */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

/* 粘性定位，未达到top值时，position是static，达到top值后，position是flex */
/* 兼容性问题，移动端可以直接使用 */
/* 支持原生滚动，使用better-scroll后失效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 999;
} */

/* 
设置滚动区域高度
1.第一种使用 calc()动态计算,运算符前后都需要保留一个空格
*/
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}

/* 
2.使用绝对定位
*/
/* .content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
} */
</style>
