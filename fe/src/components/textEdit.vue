<template>
  <div class="text-edit">
    <vTopNav></vTopNav>
    <div class="main-content">
      <el-form :model="form" :rules="rules" label-width="80px">
        <div class="btns">
         <el-button type="primary" @click="resetText">清空文章</el-button>
          <el-button type="primary" @click="submitText">发布文章</el-button>
        </div>
        <el-form-item label="文章标题" prop="title">
           <el-input  placeholder="请输入文章标题" v-model="form.title" autofocus></el-input>
        </el-form-item>
        <el-form-item label="文章来源" prop="source">
           <el-select v-model="form.source" placeholder="请选择文章来源">
            <el-option v-for="item in allSources" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <quill-editor v-model="form.content" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
      </quill-editor>
      </el-form>
    </div>
  </div>
</template>
<style scope lang='scss'>
.editer {
  height: 300px;
}

.submit-btn {
  margin-bottom: 20px;
}

.btns{
  margin: 0 0 20px 800px;
}

</style>
<script>
import vTopNav from './topNav.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { fetch } from '../common/util.js'
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        source: ''
      },
      allSources:[
        {
          label:"军事",
          value:"军事"
        },
        {
          label:"园艺",
          value:"园艺"
        },
        {
          label:"娱乐",
          value:"娱乐"
        },
        {
          label:"历史",
          value:"历史"
        }
      ],
      editorOption: {},
      rules:{
        title:[
          {
            required: true, message: '请输入文章标题', trigger: 'blur'
          },
          { 
            min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' 
          }
        ],
        source:[
          {
            required: true, message: '请选择文章来源', trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    saveArticleInterface(cb){
      let that = this;
      fetch('saveArticle', {
        title: that.form.title,
        content: that.form.content,
        source: that.form.source
      }, res => {
        if (res.code == 0) {
          cb();
        } else {
          cosole.log(res.code);
        }
      });
    },
    submitText() {
      let that = this;
      if(!that.form.title.trim()){
        that.$message({
          message: '请填写文章标题',
          type: 'warning'
        });
        return;
      }
      if(!that.form.source.trim()){
        that.$message({
          message: '请选择文章来源',
          type: 'warning'
        });
        return;
      }
      if(!that.form.content.trim()){
        that.$message({
          message: '请选择文章来源',
          type: 'warning'
        });
        return;
      }
      that.saveArticleInterface(()=>{
        that.$message({
          message: '发布成功',
          type: 'success'
        });
      });
    },
    resetText(){
      this.form={
        title: '',
        content: '',
        source: ''
      }
    }
  },
  components: {
    vTopNav,
    quillEditor
  },
  directives: {

  },
  filters: {

  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {

  }
}

</script>
