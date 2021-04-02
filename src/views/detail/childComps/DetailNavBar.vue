<!-- 商品详情页面导航栏 -->
<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class="title">
          <div v-for="(item,index) in title" :key="index" 
          class="titleItem" :class="{active:index===currentIndex}"
          @click="itemClick(index)"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      title: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style  scoped>
.title {
  display: flex;
  font-size: 14px;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>
