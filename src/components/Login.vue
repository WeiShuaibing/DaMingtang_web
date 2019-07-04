<template>
    <div class="page-container" >
        <h1 style="color: #111111">大明唐后台</h1>
        <div style=" position: relative; width: 305px;  margin: 15px auto 0 auto;  text-align: center;">
            <input id="input2" type="text" name="username" class="username" style="color: black;" placeholder="账户" v-model="username" />
            <input id="input3" type="password" name="password" class="password" style="color: black" placeholder="密码" v-model="password" />
            <button class="button2" type="submit" style="background-color: #409EFF" @click="handleLogin()"> 登 陆 </button>
            <div class="error"><span>+</span></div>
        </div>
    </div>
</template>

<script>
// import '../assets/css/reset.css'
// import '../assets/css/supersized.css'
import '../assets/css/style.css'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      this.axios.post(this.GLOBAL.BASE_URL + '/user/login', {
        username: this.username,
        password: this.password
      }).then((res) => {
        console.log(res)
        if (res.data.code === 20000) {
          this.$store.commit('changeRole', res.data.data.token)
          this.$router.push({path: '/home'})
        } else {
          alert('登陆失败 ！！！')
        }
      }).catch(function (error) {
        console.log(error)
      })
    }

  }
}
</script>

<style scoped>

.loginform{
    margin: 0 auto;
    width: 450px;
    height: 300px;
    border: 1px solid red;
}
.el-header, .el-footer {
     background-color: #B3C0D1;
     color: #333;
     text-align: center;
     line-height: 60px;
 }
.el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
  }
</style>
