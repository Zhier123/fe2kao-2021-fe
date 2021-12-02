<template>
  <div id="app">
     <mu-appbar style="width: 100%;" color="grey800">
  <mu-button v-if="this.$route.name!='login'" icon @click="open = !open" slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Tenzor-Typer
  
  <mu-button v-if="this.$route.name!='login'" flat slot="right"
  >
          <mu-icon value="account_circle"></mu-icon>
          _{{userName}}
  </mu-button>
  <mu-button flat slot="right" v-if="this.$route.name!='login'"
  @click="openModUser =true">
        更改信息
  </mu-button>
  <mu-button flat slot="right"
  @click="logoutHandler">
        注销
  </mu-button>
</mu-appbar>

  <mu-drawer :open.sync="open" :docked="docked" :right="false">
    <mu-list>
      <mu-list-item button @click="jumpHandler('list')">
        <mu-list-item-title>Type列表</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button @click="jumpHandler('history')">
        <mu-list-item-title>个人Info</mu-list-item-title>
      </mu-list-item>
      <mu-list-item  @click="open = false" button>
        <mu-list-item-title>Close</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-drawer>

  <mu-dialog title="更改信息?" width="400" max-width="40%" :esc-press-close="false" :overlay-close="false" :open.sync="openModUser">
    <mu-text-field full-width v-model="newname" label="新的用户名" prefix="$" label-float ></mu-text-field><br/>
    <mu-text-field full-width v-model="newPwd" label="新的密码" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field><br/>
    <mu-button  slot="actions" flat color="primary" @click="openModUser=false">CANCEL</mu-button>
    <mu-button  slot="actions" flat color="primary" @click="modUser">SUBMIT</mu-button>
  </mu-dialog>


  <router-view/>
  </div>
</template>

<script>
import {logout,modUser} from './apis/type.js'
export default {
  data(){
    return{
      visibility:false,
      newname:'',
      newPwd:'',
      docked: false,
      open: false,
      openModUser:false,
      recalc:false,
    }
  },
  methods:{
   jumpHandler(tp){
      this.open =false;
      if(this.$route.name==tp){
        return;
      }
      this.$router.push(`/${tp}`)
    },
    async logoutHandler(){
        try{
          const response = await logout();
          console.log(response);
          if(response.status==200){
            if(response.data.success ==true){
              this.$toast.success("注销成功");
              this.$router.push('/login')
              sessionStorage.clear();
            }else{
              this.$toast.error(response.data.error); 
            }
          }else{
            this.$toast.error("注销失败"); 
          }
        }catch(error){
          console.log(error)
        }
    },
    async modUser(){
      try{
         if(this.GLOBAL.isEmpty(this.userName)){
         this.$toast.warning("用户名不能为空");
          return;
       }
       if(this.GLOBAL.isEmpty(this.password)){
         this.$toast.warning("密码不能为空");
         return;
       }
        const response =await modUser(sessionStorage.getItem('userId'),this.newname,this.newPwd);
        console.log(response);
        sessionStorage.setItem('userName',this.newname);
        this.recalc = !this.recalc
        if(response.data.success == true){
          this.$toast.success("修改成功");   

        }else{
          this.$$toast.error("修改失败")
        }
         this.openModUser =false;
      }catch(err){
        console.log(err);
         this.$toast.success("修改失败");
         this.openModUser =false;
      }
    }
  },
  computed:{
    userName(){
        if(this.recalc){
          return sessionStorage.getItem('userName')
          }else{
            return sessionStorage.getItem('userName')
        }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
  box-sizing: border-box;
}
body,html{
  width:100%;
  height: 100%;
  background-color:rgb(211, 208, 208) 
}
#app{
  display: flex;
  flex-direction:column;
  scroll-behavior: smooth;
  height: 100%;
    background-color:rgb(211, 208, 208) ;
}
.app-content{
  flex: 1;
}
.menu-activator{
  vertical-align:center;
}
</style>
