<template>
  <div class="container">
    <el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="20px" class="form1">
      <h3>系统登录</h3>
      <el-form-item  class="form-item" prop="username">
        <el-input v-model="LoginForm.username" >
          <i slot="prefix" class="el-icon-s-custom"></i>
        </el-input>
      </el-form-item>
      <el-form-item  class="form-item" prop="password">
        <el-input type="password" v-model="LoginForm.password" >
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
       <el-checkbox class="el-checkbox" v-model="checked">记住我</el-checkbox>
       <el-row>
         <el-button type="primary" class="el-button" @click="submitForm('LoginForm')" round>登录</el-button>
       </el-row> 
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        username: "admint",
        password: "123456"
      },
      checked: true,
      rules: {
        username: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          {
           required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  components: {},
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container h3 {
  margin-left: 200px;
  margin-top: 50px;
}
.container .form1 {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  border-radius: 15px;
  border: 1px solid gainsboro;
  background: rgb(245, 241, 241);
  margin-top: 50px;
}
.container .form1 .form-item {
  margin: 20px;
}
.container .el-button {
  margin-left: 180px;
}
.container .el-checkbox{
  margin-left: 50px;
}
</style>
