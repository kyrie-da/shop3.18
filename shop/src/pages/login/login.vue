<template>
  <div class="box">
    <div class="login">
      <h2>登录</h2>
      <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../utils/req";
import { warningAlert, successAlert } from "../../utils/alerts";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      reqUser: "userActions",
    }),
    login() {
      // sessionStorage 存储
      console.log(this.user);
      if (this.user.username !== "" || this.user.password !== "") {
        reqLogin(this.user).then((res) => {
          // 将数据存入vuex`
          this.reqUser(res.data.list)
          console.log(res.data.list);
          this.$router.push('/')
          successAlert(res.data.msg)
        });
      }else{
        warningAlert('请输入用户名或者密码')
      }
      //方式二:通过localStorage进行数据存储
      // if(this.user.username !== '' || this.user.password !== ''){
      //   // 允许发起请求
      //   requestLogin(this.user).then(res=>{
      //       successAlert(res.data.msg);
      //       // 将用户信息存入到localStorage中
      //       if(localStorage.getItem('user') !== null){
      //         localStorage.removeItem('user')
      //       }
      //       localStorage.setItem('user',JSON.stringify(res.data.list))
      //       this.$router.push('/')
      //   })
      // }else{
      //   warningAlert('请输入名户名或者密码')
      // }
    },
  },
};
</script>

<style scoped>
.login {
  width: 400px;
  height: 200px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
}
.el-button {
  margin: 5px 5px;
  width: 80%;
}
.el-input {
  margin: 5px 5px;
  width: 80%;
}
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#563443, #2f3d60);
}
</style>