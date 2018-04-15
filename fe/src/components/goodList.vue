<template>
  <div class="shop-list">
    <vTopNav></vTopNav>
    <div class="main-content">
      <el-form :inline="true" :model="queryGoodForm">
        <el-form-item label="商品名称">
          <el-input v-model="queryGoodForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品种类">
          <el-input v-model="queryGoodForm.category" placeholder="请输入商品种类"></el-input>
        </el-form-item>
        <el-form-item label="商品产地">
          <el-input v-model="queryGoodForm.place" placeholder="请输入商品产地"></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="商品价格区间">
          <el-col :span="10">
            <el-input v-model="queryGoodForm.priceStart" placeholder="请输入最低价格" type="number" min='0'></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center">-</el-col>
          <el-col :span="10">
            <el-input v-model="queryGoodForm.priceEnd" placeholder="请输入最高价格" type="number" min='0'></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品添加时间">
          <el-date-picker v-model="queryGoodForm.createTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryGood(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="$store.state.goodList.list" border style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="名字">
        </el-table-column>
        <el-table-column prop="desc" label="描述">
        </el-table-column>
        <el-table-column prop="category" label="种类">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="50">
        </el-table-column>
        <el-table-column prop="place" label="产地">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" :formatter="format" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="delUser(scope.row)" type="danger" size="small">删除</el-button>
            <el-button @click="showEdit(scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <fenye :fenyeData="fenyeData"></fenye>
      <el-dialog title="编辑用户信息" center width="30%" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" label-width="80px">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="描述" label-width="80px">
            <el-input v-model="form.desc" type="textarea" clearable></el-input>
          </el-form-item>
          <el-form-item label="种类" label-width="80px">
            <el-select v-model="form.category" clearable>
              <el-option v-for="item in cSelects" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格" label-width="80px">
            <el-input-number v-model="form.price"></el-input-number>
          </el-form-item>
          <el-form-item label="产地" label-width="80px">
            <el-cascader style="width:100%" separator='-' clearable :options="options" v-model="form.placeCodes"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>


</style>
<script>
import vTopNav from './topNav.vue';
import fenye from '../common/components/fenye.vue';

import { fetch, formatDate,placeCodeToText } from '../common/util.js';
import { regionData, CodeToText,TextToCode } from 'element-china-area-data'
export default {
  data() {
    let that = this;
    return {
      dialogFormVisible: false,
      options: regionData,
      form: {
        placeCodes:[]
      },
      cSelects: [],
      queryGoodForm: {
        createTimeRange: '',
        name: '',
        category: '',
        priceStart: '',
        priceEnd: '',
        place: ''
      },
      limit: 10
      // fenyeData:{
      //   type:'good',
      //   count:that.$store.state.goodList.count
      // } //如果在这里的话是获取不到更新到的that.$store.state.goodList.count 获取的还是0
    }
  },
  mounted() {

    let that = this;
    that.getGoodList({ start: 1, limit: that.limit });

  },
  methods: {
    cancelEdit() {
      this.dialogFormVisible = false;
    },
    confirmEdit() {
      let id = this.form['_id'],
          that = this;
      fetch('updateGood',{
        id:id,
        name:that.form.name,
        category:that.form.category,
        place:placeCodeToText(that.form.placeCodes),
        price:that.form.price,
        desc:that.form.desc
      },res=>{
         that.form.place = placeCodeToText(that.form.placeCodes);
      });
      this.dialogFormVisible = false;
    },
    delUser(r) {
      let that = this;
      console.log(that.curPageNum);
      fetch('delGood', { id: r['_id'] }, res => {
        console.log(that.curPageNum);
        this.queryGood(this.$store.state.goodList.curPageNum);
      });
    },
    showEdit(r) {
       let codes = [];
      let places = r.place.split('-'),
          code1 = TextToCode[places[0]].code,
          code2 = places[1] && TextToCode[places[0]][places[1]].code,
          code3 = places[1]&& places[2] && TextToCode[places[0]][places[1]][places[2]].code;
      codes.push(code1,code2,code3);
      console.log(r.id);
       r.placeCodes = codes;
      this.form = r;
      let that = this;
      fetch('findCategory', {}, res => {
        res.data.list.forEach((item) => {
          that.cSelects.push({
            value: item.category
          });
        })

      });
     this.dialogFormVisible = true;
    },
    queryGood() {
      console.log('query');
    },
    format(row, col, cellValue) {
      return formatDate(cellValue);
    },
    showTip(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'warning'
      });
    },
    checkQueryCondition(search) {

      if (search.priceStart) {
        if (!search.priceEnd) {
          this.showTip('请输入最高价格');
          return;
        } else {
          let low = Number(search.priceStart),
            high = Number(search.priceEnd);
          if (low > high) {
            this.showTip('最高价格小于了最低');
            return;
          }
        }

      }

      if (!search.priceStart && search.priceEnd) {
        this.showTip('请输入最低价格');
      }
    },
    getGoodList(param) {
      let that = this;
      fetch('queryGood', param, res => {
        that.$store.dispatch('getCurGoodList', {
          list: res.data.list,
          count: res.data.count
        });
      });
    },

    queryGood(curPageNum) {

      let that = this;
      let search = that.queryGoodForm;
      let param = {
        start: (curPageNum - 1) * this.limit,
        limit: this.limit
      };
      this.checkQueryCondition(search);

      if (search.name) param['name'] = search.name;
      if (search.category) param['category'] = search.category;
      if (search.priceStart) param['priceStart'] = Number(search.priceStart);
      if (search.priceEnd) param['priceEnd'] = Number(search.priceEnd);
      if (search.createTimeRange) {
        param['createTimeStart'] = new Date(search.createTimeRange[0]).getTime();
        param['createTimeEnd'] = new Date(search.createTimeRange[1]).getTime();
      }

      if (search.place) param['place'] = search.place;

      this.getGoodList(param);

    }
  },
  components: {
    vTopNav,
    fenye
  },
  directives: {

  },
  filters: {

  },
  computed: {
    curPageNum() {
      return this.$store.state.goodList.curPageNum;
    },
    fenyeData: function() {
      return {
        type: 'good',
        count: this.$store.state.goodList.count,
        search: this.queryGoodForm
      }
    }
  },
  watch: {

  }
}

</script>
