<template>
  <div class="add-goods">
    <vTopNav></vTopNav>
    <div class="main-content">
      <h2>添加商品</h2>
      <el-form ref="form" :model="form" label-width="80px" class='form'>
        <el-row>
          <el-form-item label="商品种类">
            <el-select v-model="form.category" clearable placeholder="请选择商品种类">
              <el-option v-for="item in categorySelects" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="add_category_row" :class="addCategoryShow ? '' : 'no-show'">
          <div class="add_category">
            <el-form-item label="商品种类" prop="name">
              <el-input v-model="addCategoryName" placeholder="请输入商品种类" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addCategory">提交</el-button>
            </el-form-item>
          </div>
        </el-row>
        <div class="add_category_button" @click="showAddCategory">
          <i class="el-icon-caret-top edit_icon" v-if="addCategoryShow"></i>
          <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
          <span>添加食品种类</span>
        </div>
        <el-row>
          <el-form-item label="商品名称">
            <el-input v-model="form.name" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="商品描述">
            <el-input v-model="form.desc" type="textarea" :rows="5" placeholder="请输入商品描述" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="商品规格">
          <el-radio class="radio" v-model="form.standard" label="1">单规格</el-radio>
          <el-radio class="radio" v-model="form.standard" label="2">多规格</el-radio>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="商品产地">
          <el-cascader style="width:60%" separator='-' clearable placeholder="请输入商品产地" :options="options" v-model="form.place"></el-cascader>
        </el-form-item>
        <el-row>
          <el-form-item label="详细地址">
            <el-input v-model="form.detailPlace" placeholder="请输入详细地址" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="addGood">添加</el-button>
          <el-button type="info" @click="resetAddGood">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scope>
h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form {
  width: 60%;
  margin: 0 auto;
  border: 1px solid #eee;
  padding: 10px 0 0;
}

.no-show {
  display: none;
}

.add_category_button {
  width: 100%;
  background: #f6f6f6;
  padding: 10px 0;
  text-align: center;
  color: #606266;
  font-size: 14px;
  margin-bottom: 20px;
}

</style>
<script>
import vTopNav from './topNav.vue';
import { fetch } from '../common/util.js';
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data() {
    return {
      form: {
        category: '',
        name: '',
        desc: '',
        standard: '1',
        price: 1,
        place: [],
        detailPlace: ''
      },

      options: regionData,

      categorySelects: [],

      tip: {
        ref: 'popover2',
        text: '',
        popDisabeld: true
      },

      addCategoryName: '',
      addCategoryShow: false,

      tip: {
        category: "请选择商品种类",
        desc: "请填写商品描述",
        name: "请填写商品名称",
        place: "请选择商品产地"
      }
    }
  },
  mounted() {
    let that = this;
    fetch('findCategory', {}, res => {
      res.data.list.forEach((item) => {
        that.categorySelects.push({
          value: item.category
        });
      })

    });
  },
  methods: {
    showTipInfo(msg){
      this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          });
    },
    checkAddGoodForm() {
      if(!this.form.category){
        this.showTipInfo(this.tip.category);
      }
    },
    checkAddCategoryForm(){
      if (!this.addCategoryName.trim()) {
        this.$message({
            showClose: true,
            message: '请添加商品种类',
            type: 'error'
          });
        return;
      }
    },
    placeCodeToText(formPlace){
       let place = '';
      formPlace.forEach((item, index) => {
        if (index !== 0) {
          place += '-';
        }
        place += CodeToText[item];
      });
      return place;
    },
    addGood() {
      let place = '',
        that = this;
      this.checkAddGoodForm();

      fetch('saveGood', {
        category: that.form.category,
        name: that.form.name,
        desc: that.form.desc,
        standard: that.form.standard,
        price: that.form.price,
        place: that.placeCodeToText(that.form.place),
        detailAddress: that.form.detailPlace

      }, res => {
        if (res.code == 0) {
          that.resetAddGood();
        } else {
          cosole.log(res.code);
        }
      });
    },
    resetAddGood() {
      this.form = {
        category: '',
        name: '',
        desc: '',
        standard: '1',
        price: 1,
        place: [],
        detailPlace: ''
      };
    },
    showAddCategory() {
      this.addCategoryShow = !this.addCategoryShow;
      this.addCategoryName = '';
    },
    addCategory() {
      let that = this;
      that.checkAddCategoryForm();
      fetch('saveCategory', { category: that.addCategoryName }, res => {
        if (res.code == 0) {
          that.categorySelects.push({
            value: that.addCategoryName
          });
        } else {
          
        }
      });
    }
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
