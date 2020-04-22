<template>
  <div class="container">
    <el-form :model="LoginForm" :rules="rules" ref="LoginFormRef" label-width="20px" class="form1">
      <h3>系统登录</h3>
      <el-form-item  class="form-item" prop="username">
        <el-input v-model="LoginForm.username" >
          <i slot="prefix" class="el-icon-s-custom"></i>
        </el-input>
      </el-form-item>
      <el-form-item  class="form-item" prop="password">
        <el-input  v-model="LoginForm.password" prefix-icon="iconfont icon-password" show-password >
        </el-input>
      </el-form-item>
       <el-checkbox class="el-checkbox" v-model="checked">记住我</el-checkbox>
       <el-row>
         <el-button type="primary" class="el-button" @click="submitForm('LoginFormRef')" round>登录</el-button>
         <el-button type="info" class="el-button" @click="resetForm('LoginFormRef')" round>重置</el-button>
       </el-row> 
    </el-form>
  </div>
</template>

<script>
import { postKeyValueRequest } from '../utils/api'
export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        username: "admin",
        password: "123"
      },
      checked: true,
      rules: {
        username: [
           { required: true, $message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, $message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          {
           required: true, $message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if(!valid){
          return this.$message.error('用户名或密码格式不正确,请重新输入');
        }
      
        const resp = await this.postKeyValueRequest('/doLogin', this.LoginForm)
        console.log(resp)
        if (resp) {
          console.log(resp.obj);
          this.$message.success("登录成功")
          
        // 1.将登录成功之后的user保存到客户端的sessionStorage中
        //  1.1 项目中出了登录之外的其它API接口，必须在登录之后才能访问
        //    1.2 user只应在当前网站打开期间生效，所以将user保存在sessionStorage中
        //sessionStorage存储中的几种常用的API 
        //     getItem //取记录  setItem//设置记录 removeItem//移除记录 key//取key所对应的值 clear//清除记录
          window.sessionStorage.setItem('user', JSON.stringify(resp.obj));
          //获取查询字符串中的paht受否包含redirect
          let path=this.$route.query.redirect
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
           await this.$router.replace((path === '/' || path === undefined) ? '/home' : path)
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
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
  margin-left: 120px;
}
.container .el-checkbox{
  margin-left: 50px;
}
</style>
