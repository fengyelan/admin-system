<template>
  <div class="user-list">
    <vTopNav></vTopNav>
    <div class="main-content">
      <el-form :inline="true" :model="search">
        <el-form-item label="用户名">
          <el-input v-model="search.key" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="注册日期">
          <el-date-picker v-model="search.start" type="date" placeholder="选择开始注册日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-model="search.end" type="date" placeholder="选择结束注册日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="resetSearch">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-tooltip :disabled="disabledTip" effect="dark" :content="tipText" placement="bottom-end">
            <el-button type="primary" @click="find">查询</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <el-table :data="list" border style="width: 100%" :default-sort="{prop: 'registerTime', order: 'descending'}">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="registerTime" sortable label="注册时间">
        </el-table-column>
        <el-table-column prop="lastModifyTime" label="修改时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="delUser(scope.row)" type="danger" size="small">删除</el-button>
            <el-button @click="showEdit(scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination background layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    <!--  <fenye :fenyeData="fenyeData"></fenye> -->
      <el-dialog title="编辑用户信息" center width="30%" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang='scss' scope>


.fenye {
  text-align: center;
  margin-top: 20px;
}

</style>
<script>
import vTopNav from './topNav.vue';
import fenye from '../common/components/fenye.vue';
import {fetch,fetchMuti} from '../common/util.js';
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username:''
      },
      count: 0,
      list: [],
      limit: 10,
      curPageNum: 1,
      disabledTip: true,
      tipText: '',
      search: {
        key: '',
        start: '',
        end: ''
      },
      editUser:{},
      timeout: null
    }
  },
  mounted() {
    let that = this,
      url1 = "http://localhost:3000/queryUserList?start=0&limit=" + that.limit,
      url2 = "http://localhost:3000/getAllCount?type=user";
      
    fetchMuti([url1,url2],(res1, res2) => {
        that.list = res1.data.list;
        that.count = res2.data.count;
      });
  },
  methods: {
    cancelEdit(){
      this.dialogFormVisible = false;
      this.form.username = '';
    },
    edit(user){
      let that = this;

      fetch('updateUser',{
          id:that.editUser.id,
          username:that.form.username
      },res => {
          that.dialogFormVisible = false;
          that.editUser.username = that.form.username;
          that.editUser.lastModifyTime = res.data.lastModifyTime;
          that.form.username = "";
      });
    },
    showEdit(user){
      let that = this;
      that.dialogFormVisible = true;
      that.editUser = user;
    },
    resetSearch() {
      this.search = {
        key: '',
        start: '',
        end: ''
      }
    },
    getCurPageUser(curPageNum, limit, search) {
      let that = this,
        param = {
          start: (curPageNum - 1) * limit,
          limit: limit
        };

      if (search && !!search.key) {
        param['username'] = search.key;
      }

      if (search && search.start && search.end) {
        param['startTs'] = search.startTs;
        param['endTs'] = search.endTs;
      }
      
      fetch('queryUserList',param,res => {
         that.list = res.data.list;
         that.count = res.data.count;
      })
      

    },
    delUser(user) {
      let that = this;
      fetch('delUser',{id: user.id},() => {
         that.getCurPageUser(that.curPageNum, that.limit);
      })

    },
    handlerTip(text) {
      let that = this;
      that.tipText = text;
      that.disabledTip = false;
      clearTimeout(that.timeout);
      that.timeout = setTimeout(function() {
        that.disabledTip = true;
      }, 5000);
    },
    find() {
      let that = this;
      let ts_start = new Date(that.search.start).getTime(),
        ts_end = new Date(that.search.end).getTime();
      that.search['startTs'] = ts_start;
      that.search['endTs'] = ts_end;

      that.disabledTip = true;
      if (that.search.start && !that.search.end) {
        that.handlerTip("请输入结束注册日期");
        return;
      }
      if (!that.search.start && that.search.end) {
        that.handlerTip("请输入开始注册日期");
        return;
      }

      if (ts_start > ts_end) {
        that.handlerTip("请输入结束注册日期不小于开始");
        return;
      }

      that.getCurPageUser(that.curPageNum, that.limit, that.search);
    },
    handleCurrentChange(val) {
      let that = this;
      that.curPageNum = val;
      that.getCurPageUser(that.curPageNum, that.limit);
    }
  },
  components: {
    vTopNav,fenye
  },
  directives: {

  },
  filters: {

  },
  computed: {
    fenyeData: function() {
      return {
        type: 'user',
        count: this.$store.state.userList.count,
        search: this.search
      }
    }
  },
  watch: {

  }
}

</script>
