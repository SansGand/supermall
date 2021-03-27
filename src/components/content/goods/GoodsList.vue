<!-- 商品详情展示整体页面 -->
<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name: "GoodsList",
  data () {
    return {
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style  scoped>
.goods {
    display: flex;
    /* 一行放不下时可拆分换行 */
    flex-wrap: wrap;
    /* 可在元素各项周围留白 */
    justify-content: space-around;
    padding: 2px;
  }
</style>
