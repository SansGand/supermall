<!-- 购物车 -->
<template>
  <div class="shopcar">
    <nav-bar class="navbar">
      <template #center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <carts-list></carts-list>
    </scroll>
    <carts-bottom-bar></carts-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartsList from './childComps/CartsList'
import CartsBottomBar from './childComps/CartsBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name: "Shopcar",
  components: {
    NavBar,
    CartsList,
    CartsBottomBar,
    Scroll
  },
  computed: {
    //两种语法
    //1.数组直接用里面的方法名
    // ...mapGetters(['getCartsLength'])
    //2.对象key为自定义，value为getters的方法名
    ...mapGetters({
      length: 'getCartsLength'
    })

  },
  activated() {
    //因为组件在keep-alive里，如果第一次进来打开购物车页面
    //然后再回到首页添加商品，再回购物车页面时，无法滚动
    this.$refs.scroll.refresh()
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
.shopcar{
  height: 100vh;
}

.navbar {
  background-color:var(--color-tint);
  color: #fff;
}

.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
