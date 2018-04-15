<template>
  <div class="shop-table">
    <vTopNav></vTopNav>
    <div class="main-content">
      <h2 class='center'>商品图表分布</h2>
      <div id="main" style="width: 50%;height:400px;"></div>
    </div>
  </div>
</template>
<style scope lang='scss'>
.center{
  text-align: center;
}

#main{
  margin:0 auto;
}

</style>
<script>
import vTopNav from './topNav.vue';
import * as echarts from 'echarts';
import { fetch } from '../common/util.js';
export default {
  data() {
    return {
      data: null
    }
  },
  mounted() {

    let that = this,
      legendData = [],
      seriesData = [],
      selected = {};
    fetch('findCategory', {}, res => {
      let list = res.data.list;
      list.forEach((item, index) => {
        legendData.push(item.category);
        selected[item.category] = index < 6;
        seriesData.push({
          name:item.category,
          value:item.count
        })
      });
      let option = {
        title: {
          text: '各种类商品统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 0,
          left:'center',
          data: legendData
        },
        series: [{
          name: '商品种类',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };

      echarts.init(document.getElementById('main')).setOption(option);
    });


  },
  methods: {

  },
  components: {
    vTopNav

  },
  directives: {

  },
  filters: {

  },
  computed: {

  },
  watch: {

  }
}

</script>
