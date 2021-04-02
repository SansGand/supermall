<!-- 弹窗组件 -->
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    // 默认1500毫秒
    show(message,duration = 1500) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style  scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  /* 走盒子自身宽高的一半，和父元素无关 */
  transform: translate(-50%, -50%);
  padding: 5px 8px;
  border-radius: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);;
  z-index: 999;
}
</style>
