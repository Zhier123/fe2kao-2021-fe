<template>
  <mu-container>
  <mu-appbar style="width: 100%;" title="段落列表" class="title"></mu-appbar>
  <mu-expansion-panel v-for="(passage,index) in passages"
  :key="index"
  :expand="panel === `panel${index}`" 
  @change="toggle(`panel${index}`)"
  >
    <div slot="header">{{passage.title}}
       <mu-chip :color="passage.type=='hard'?'red':'green'">
         {{passage.type}}
      </mu-chip>
    </div>
     <mu-linear-progress :color="passage.type=='hard'?'red':'green'"></mu-linear-progress>
    <mu-button slot="action" flat color="primary" @click="PLAY(passage.id)">PLAY</mu-button>
  </mu-expansion-panel>
   <mu-flex justify-content="center" style="margin: 32px 0;">
    <mu-pagination 
    color="blueGrey700" 
    circle 
    :total="total"
    :page-size="6"
    :current.sync="current"
    @change="pageChangeHandler"></mu-pagination>
  </mu-flex>
  </mu-container>

</template>
<script>
import {getList} from '../apis/type.js'
export default {
  async mounted(){
    if(sessionStorage.getItem('userId') == null){
      this.$toast.error("请先登录");
      this.$router.push('/login');
    }
    var that = this;
    try{
      const response = await getList('easy',1);
      console.log(response);
      const list = response.data.data.passages;
      that.total = response.data.data.total;
      list.map((item)=>{
        that.passages.push(item);
      })
    }catch(err){
      console.log(err)
    }
  },
  data(){
    return{
      total:0,
      current:1,
      type:'easy',
      panel: '',  
      passages:[
       
      ]
    }
  },
  methods:{
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel;
      },
async pageChangeHandler(){
        console.log(this.current);
        try{
          const response =await getList(this.type,this.current);
          console.log(response)
          if(response.data.success ==true){
            this.passages.splice(0,this.passages.length);
            const list = response.data.data.passages;
            this.total = response.data.data.total;
            list.map((item)=>{
            this.passages.push(item);
            })
          }
        }catch(err){
          console.log(err)
        }
      },
      PLAY(id){
        this.$router.push(`/main/${id}`)
      }
  },
  computed:{
     pageNum(){
        return Math.floor(this.total/6)+1;
      }
  }
}
</script>
<style scoped>
  .title{
    margin-top:20px;
  }
</style>

