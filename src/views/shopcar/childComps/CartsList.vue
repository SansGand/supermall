<!-- 购物车列表 -->
<template>
  <div class="carts-list">
    <carts-list-item v-for="(item,index) in getCartsList" :key="index" :carts="item"></carts-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartsListItem from './CartsListItem'

export default {
  name: "CartsList",
  components: {
    CartsListItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getCartsList'])
  }
}
</script>

<style  scoped>

</style>
