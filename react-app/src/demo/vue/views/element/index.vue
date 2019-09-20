<template>
  <div class="app">
    <a href="javascript:void(0);" v-on:click="goBack">GoBack</a>
    <div class="title">Element UI BUTTON</div>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <div class="title">Element UI FORM</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简单自定义" prop="simple">
        <el-input v-model="form.simple"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/**
 * App 入口文件
 */
export default {
  data() {
    return {
      // 表单数据
      form: {
        name: '',
        simple: '',
        region: ''
      },
      // 规则校验
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        simple: [{ validator: this.validSimple, trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 简单校验规则
    validSimple(rule, value, callback) {
      if (value != 'simple') {
        callback(new Error('简单自定义请填写simple'));
      } else {
        callback();
      }
    },
    // 提交校验
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('success');
        } else {
          console.log('fail');
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};

</script>
<style scoped lang="scss">
.app {
  .title {
    font-weight: bold;
    color: blue;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}

</style>
