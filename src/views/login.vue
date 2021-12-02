<template>
  <mu-container class="con">
      <mu-container class="loginBox">
        <mu-paper class="demo-paper" :z-depth="1">
          
          <mu-flex v-if="registry==false" class="flexBox" align-items="center" direction="column" >
            <mu-appbar style="width: 100%;" title="登录">
              <mu-button flat slot="right" @click="registry=!registry">注册</mu-button>
            </mu-appbar>
            <mu-text-field v-model="userName" label="UserName" label-float help-text="用户名" icon="account_circle"></mu-text-field>
            <mu-text-field v-model="password" label="Password" label-float error-text="请输入密码" icon="locked"></mu-text-field>
            <mu-button color="red" @click="loginHandler">
               Login
            <mu-icon right value="send" ></mu-icon>
          </mu-button>
          </mu-flex>

          <mu-flex v-else class="flexBox"  align-items="center" direction="column" >
            <mu-appbar style="width: 100%;" title="注册">
              <mu-button flat slot="right" @click="registry=!registry">登录</mu-button>
            </mu-appbar>
            <mu-text-field  v-model="regName" label="UserName" label-float help-text="用户名" icon="account_circle"></mu-text-field>
            <mu-text-field color="indigo400" v-model="regPassword" label="Password" label-float icon="locked"></mu-text-field>
            <mu-button color="indigo400" @click="registryHandler">
               Registry
            <mu-icon right value="send"></mu-icon>
          </mu-button>
          </mu-flex>
        </mu-paper>  
    </mu-container>

  </mu-container>
</template>
<script>

import {login, registry} from '../apis/type.js'
export default {
  data(){
    return{
      registry:false,
      userName:'',
      password:'',
      regName:'',
      regPassword:'',
      uid:0,
    }
  },
  methods:{
   async loginHandler(){
     console.log("hello")
      if(this.GLOBAL.isEmpty(this.userName)){
         this.$toast.warning("用户名不能为空");
          return;
       }
       if(this.GLOBAL.isEmpty(this.password)){
         this.$toast.warning("密码不能为空");
         return;
       }
     try{
       const response = await login(this.userName,this.password);
       console.log(response);
       if(response.data.success == true){
         this.$toast.success("登录成功");
       }else{
         this.$toast.warning("???")
       }
     }catch(err){
       this.$toast.error("登录失败");
       console.log(err)
     }
   },
   async registryHandler(){
       if(this.GLOBAL.isEmpty(this.userName)){
         this.$toast.warning("用户名不能为空");
          return;
       }
       if(this.GLOBAL.isEmpty(this.password)){
         this.$toast.warning("密码不能为空");
         return;
       }
     try{
       const response = await registry(this.regName,this.regPassword);
       console.log(response);
       if(response.data.success == true){
         this.$toast.success("注册成功");
       }
     }catch(err){
       this.$toast.error("注册失败");
       console.log(err)
     }
   }
  }
}
</script>
<style scoped>
  .con{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginBox{
    width:50%;

  }
  .demo-paper{
    padding: 5%;
    height: 100%;
  }
  .flexBox{
    height: 100%;
  }

</style>