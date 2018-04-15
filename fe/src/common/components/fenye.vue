<template>
  <div class="fenye">
    <el-pagination background layout="prev, pager, next" :total="fenyeData.count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<style>
.fenye {
  text-align: center;
  margin-top: 20px;
}

</style>
<script>
import { fetch } from "../util.js";
export default {
  props: ['fenyeData'],
  data() {
    return {
      limit: 10,

      vData: {
        'good': {
          path: 'queryGood',
          actionGet: 'getCurGoodList',
          actionSet: 'setGoodListCurPageNum'
        },
        'user': {
          path: 'queryUserList',
          actionGet: 'getCurUserList',
          actionSet: 'setUserListCurPageNum'
        }
      }

    }
  },
  mounted() {

  },
  methods: {
    getCurPageUser(curPageNum, type, search) {

      let that = this,
        path = that.vData[type].path,
        actionGet = that.vData[type].actionGet;

      let param = {
        start: (curPageNum - 1) * this.limit,
        limit: this.limit
      };

      if (search) {
        if (search.name) param['name'] = search.name;
        if (search.category) param['category'] = search.category;
        if (search.priceStart) param['priceStart'] = Number(search.priceStart);
        if (search.priceEnd) param['priceEnd'] = Number(search.priceEnd);
        if (search.createTimeRange) {
          param['createTimeStart'] = new Date(search.createTimeRange[0]).getTime();
          param['createTimeEnd'] = new Date(search.createTimeRange[1]).getTime();
        }

        if (search.place) param['place'] = search.place;
      }

      fetch(path, param, res => {
        that.$store.dispatch(actionGet, {
          list: res.data.list,
          count: res.data.count
        });
      });

    },
    handleCurrentChange(val) {
      if (!this.fenyeData) return;

      if (!this.fenyeData.type) return;


      let type = this.fenyeData.type,
        actionSet = this.vData[type].actionSet;

      this.$store.dispatch(actionSet, val);


      let search = this.fenyeData.search;

      if (search.name || search.createTimeRange || search.category || search.priceStart || search.priceEnd || search.place) {
        this.getCurPageUser(val, type, search);
      } else {
        this.getCurPageUser(val, type);
      }

 // console.log('<<<<,'+this.$store.state);
 // console.log(this.$store.state);



    }
  },
  components: {

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
