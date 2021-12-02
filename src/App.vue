<template>
  <div id="app">
     <mu-appbar style="width: 100%;" color="grey800">
  <mu-button v-if="this.$route.name!='login'" icon @click="open = !open" slot="left">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  Tenzor-Typer
  
  <mu-button v-if="this.$route.name!='login'" flat slot="right"
  @click="jumpHandler('history')">
          <mu-icon value="account_circle"></mu-icon>
          _{{this.GLOBAL.userName}}
  </mu-button>
  <mu-button v-if="this.$route.name!='login'" flat slot="right"
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
  <router-view/>
  </div>
</template>

<script>
import {logout} from './apis/type.js'
export default {
  data(){
    return{
      docked: false,
      open: false,
    }
  },
  methods:{
   jumpHandler(tp){
      if(this.$route.name==tp){
        return;
      }
      this.$router.push(`/${tp}`)
    },
    async logoutHandler(){
        try{
          const response = await logout();
          console.log(response);
        }catch(error){
          console.log(error)
        }
    },
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
