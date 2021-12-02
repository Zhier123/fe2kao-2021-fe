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
    <mu-button slot="action" flat color="primary">PLAY</mu-button>
  </mu-expansion-panel>
   <mu-flex justify-content="center" style="margin: 32px 0;">
    <mu-pagination color="blueGrey700" circle :total="1000" :current.sync="current"></mu-pagination>
  </mu-flex>
  </mu-container>

</template>
<script>
export default {
  data(){
    return{
      current:1,
      panel: '',
      userName:this.GLOBAL.userName,
      userId:this.GLOBAL.userId,
      passages:[
        {
          id:1,
          title:'HelloWord',
          type:'hard',
        },
        {
          id:2,
          title:'dndn',
          type:'easy',
        },
        {
          id:3,
          title:'veibae',
          type:'hard',
        },
        {
          id:4,
          title:'HelloWord',
          type:'hard',
        },
        {
          id:5,
          title:'dndn',
          type:'easy',
        },
        {
          id:6,
          title:'veibae',
          type:'hard',
        },
      ]
    }
  },
  methods:{
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel;
      }
  }
}
</script>
<style scoped>
  .title{
    margin-top:20px;
  }
</style>

