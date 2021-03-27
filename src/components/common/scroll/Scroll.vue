<!-- 滚动组件 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted() {
    //document.querySelector('.wrapper')
    //最好不要用这种方式获取元素，因为如果多个元素都叫这个，会引起混乱
    //ref如果绑定在组件上，通过this.$refs.refname获取的是一个组件对象
    //ref如果绑定在元素上，通过this.$refs.refname获取的是一个元素对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //实时监测滚动位置
      //0,1 不实时监测
      //2 在手指滚动过程中监测，手指离开后的惯性滚动不监测
      //3 只要是滚动，都监测
      probeType: this.probeType,
      //默认会阻止浏览器原生的click事件
      click: true,
      //开启上拉加载更多
      pullUpLoad: this.pullUpLoad

    })

    //监测滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })

    //上拉加载更多
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')

      // pullingUp只能加载一次，所以需要调用finishPullUp
      // 这样才能在执行下一次pullingUp
      // this.scroll.finishPullUp()
    })
  },
  methods: {
    refresh() {
      //判断scroll是否加载完成
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style  scoped>

</style>
