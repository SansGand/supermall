<!-- 底端导航栏按钮页面 -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive:true
    }
  },
  computed: {
    isActive(){
      //当前活跃路由路径
      // return this.$route.path.indexOf(this.path) !== -1;
      return this.$route.path === this.path;
    },
    activeStyle(){
      //动态绑定属性，颜色由外界决定，默认为红色
      return this.isActive?{color:this.activeColor}:{};
    }
  },
  methods: {
    //路由跳转
    itemClick(){
      this.$router.replace(this.path);
    }
  }
}
</script>

<style  scoped>
.tab-bar-item {
  /* 均等分 */
  flex: 1;
  /* 居中 */
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去除图片下面本身的3像素 */
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
