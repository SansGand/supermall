<!-- 返回顶部 -->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
.back-top {
  position: fixed;
  bottom: 50px;
  right: 10px;
}
.back-top img {
  height: 43px;
  width: 43px;
}
</style>
