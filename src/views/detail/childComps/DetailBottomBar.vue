<!-- 底部工具栏 -->
<template>
  <div class="bottom-bar">
    <div class="bar-item left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item right">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data () {
    return {
    }
  },
  methods: {
    cartClick() {
      this.$emit('addCart')
    }
  }
}
</script>

<style  scoped>
  .bottom-bar{
    height: 49px;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px auto 3px;
    background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }
  .left .shop {
    background-position: 0 57px;
  }
  .left .service {
    background-position: 0 107px;
  }
  .text {
    font-size: 14px;
  }
  .right>div {
    height: 49px;
    width: 94px;
    line-height: 49px;
    font-size:15px;
    text-align: center;
  }
  .cart {
    background-color: #fff737;
    color:#666;
  }
  .buy {
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
