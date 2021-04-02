<!-- 参数信息 -->
<template>
  <div v-if="Object.keys(paramsInfo).length !== 0" class="params-info">
    <table class="info-size">
      <tr v-for="(item,index) in paramsInfo.sizes[0]" :key="index">
        <td v-for="(td,indey) in item" :key="indey">
          {{td}}
        </td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="(item,index) in paramsInfo.infos" :key="index">
        <td class="params-key">{{item.key}}</td>
        <td class="params-value">{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
  .params-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .params-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .params-info table tr {
    height: 42px;
  }
  .params-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-params {
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .params-key {
    width: 95px;
  }
  .params-value {
    color: #eb4868
  }
</style>
