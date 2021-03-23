<!-- 导航整体页面 -->
<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template #item-icon>
        <!-- html里的别名要加~ -->
        <img src="~assets/img/home.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/home_active.svg" alt="">
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template #item-icon>
        <img src="~assets/img/category.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/category_active.svg" alt="">
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/shopcar">
      <template #item-icon>
        <img src="~assets/img/shopcar.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/shopcar_active.svg" alt="">
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template #item-icon>
        <img src="~assets/img/profile.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/profile_active.svg" alt="">
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>

</style>
