<!-- 购物车每个商品 -->
<template>
  <div class="carts-list-item">
    <div class="item-select">
      <img src="~assets/img/cart/tick.svg" :class="{checked: carts.checked}" @click="selectCheck" alt="">
    </div>
    <div class="item-img">
      <img :src="carts.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{carts.title}}</div>
      <div class="item-desc">{{carts.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{carts.price}}</div>
        <div class="item-count right">x{{carts.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartsListItem",
  props: {
    carts: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    //切换选中状态
    selectCheck(){
      this.$store.commit('selectCheck',this.carts)
    }
  }
}
</script>

<style  scoped>
  .carts-list-item{
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    /* 解决图片等空隙 */
    font-size: 0;
  }
  .item-select {
    width: 20px;
    /* 图片居中对齐 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-select img {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .checked {
    background-color: var(--color-tint);
    border-color: var(--color-tint) !important;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  /* 文本不换行 */
  /* 超出部分显示省略号 */
  /* 超出部分隐藏 */
  .item-title, .item-desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .item-desc {
    margin-top:15px;
    font-size: 14px;
    color: #666;
  }
  .item-bottom {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .item-bottom .item-price {
    color: orangered;
  }
</style>
