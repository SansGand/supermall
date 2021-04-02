<!-- 底部工具栏 -->
<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <img src="~assets/img/cart/tick.svg" :class="{checked: isCheckedAll}" @click="checkedAll" alt="">
      <span>全选</span>
    </div>
    <div class="total">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="clickCalc">
      去计算({{totalCount}})
    </div>
  </div>
</template>

<script>
export default {
  name: "CartsBottomBar",
  data () {
    return {
    }
  },
  computed: {
    //filter中的回调函数有一个要求：必须返回一个boolean值
    //当返回true时，函数内部自动将这次回调的n加入到新的数组中
    //当返回false时，函数内部会过滤这次的n

    //reduce作用对数组中所有的内容进行汇总
    //第一次：preValue 0 n 20
    //第二次：preValue 20 n 40
    //第三次：preValue 60 n 100
    //第四次：preValue 160 n 120
    //reduce(function(pre,n),initiaValue) initiaValue传给函数的初始值
    totalPrice() {
      return '￥' + this.$store.state.cartsList.filter((n) => {
        return n.checked == true //选中的商品
      }).reduce((preValue,n) => {
        return preValue + n.price * n.count //价格相加
      },0).toFixed(2)
    },
    totalCount() {
      return this.$store.state.cartsList.filter((n) => {
        return n.checked == true //选中的商品
      }).reduce((preValue,n) => {
        return preValue + n.count //数量相加
      },0)
    },
    //是否全选
    isCheckedAll() {
      if(this.$store.state.cartsList.length == 0)return false
      //some()一真全真 every()一假全假 这两个方法也可以
      // return !(this.$store.state.cartsList.filter(n => n.checked == false).length)
      return !(this.$store.state.cartsList.find(n => n.checked == false))
    }
  },
  methods: {
    checkedAll() {
      if(this.isCheckedAll) {
        this.$store.state.cartsList.forEach(n => n.checked = false)
      }else{
        this.$store.state.cartsList.forEach(n => n.checked = true)
      }
    },
    clickCalc() {
      if(this.totalCount == 0){
        this.$toast.show('请添加需要购买的商品')
      }
    }
  }
}
</script>

<style  scoped>
.bottom-bar{
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.checked-content{
  display: flex;
  /* 元素垂直居中 */
  align-items: center;
  margin-left: 5px;
}
.checked-content img{
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
  margin-right: 5px;
}
.checked {
  border: 2px solid red !important;
  background-color: red;
}
.total{
  /* 右对齐 */
  margin-left: auto;
}
.calculate{
  width: 100px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
  /* 右对齐 */
  margin-left: auto;
}
</style>
