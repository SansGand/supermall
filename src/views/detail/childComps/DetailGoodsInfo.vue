<!-- 商品图片展示 -->
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" 
      :src="item" alt="" @load="imgsLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      counter: 0,
      imgLength: 0
    }
  },
  methods: {
    imgsLoad() {
      this.$emit('imageLoad')
    },
    //第2种防止频繁调用refresh的方法
    //判断，所有图片都加载完了，进行一次回调就可以了
    // imgsLoad() {
    //   if(++this.counter === this.imgLength){
    //     this.$emit('imageLoad')
    //   }
    // }
  },
  watch: {
    detailInfo() {
      //获取图片的个数
      this.imgLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style  scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
    .info-desc {
    padding: 0 15px;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {
    width: 100%;
  }

  /* 利用伪元素制作效果 */
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
</style>
