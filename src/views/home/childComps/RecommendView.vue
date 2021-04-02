<!-- 首页推荐模块 -->
<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  data () {
    return {
    }
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style  scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  font-size: 15px;
}
.recommend-item{
  /* 水平均等分布 */
  flex:1
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-top: 10px;
}
</style>
