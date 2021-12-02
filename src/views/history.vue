<template>
  <mu-container style="height:100%;">
  <mu-paper style = "padding:2% 0 5% 0" :z-depth="1">
    <mu-data-table  :fit="true" stripe 
     :loading="true"
     :columns="columns" :sort.sync="sort" 
     @sort-change="handleSortChange" 
     :data="list">
      <template slot="expand" slot-scope="prop">
        <mu-flex justify-content="center" align-items="center" style="padding:0 24px 0 24px">
          <span style="margin-right:40%">PASSAGEID:{{prop.row.passageId}}</span>
          <mu-button @click="delrecord(prop.row.id)" flat slot="right" color="primary">清除记录</mu-button>
        </mu-flex>
      </template>
      <template slot-scope="scope"> 
        <td class="is-center">{{scope.row.title}}</td>
        <td class="is-center">{{scope.row.wpm}}</td>
      </template>
    </mu-data-table>
  </mu-paper>
</mu-container>
</template>

<script>
import {getContent,getrecord,delrecord} from '../apis/type.js'
export default {
  mounted(){
    this.getrecord();
  },
  data () {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
          { title: 'TITLE',  name: 'name',align: 'center' },
          { title: '最佳成绩(wpm)', name: 'wpm', align: 'center', sortable: true },
      ],
      list: [
          {
            name: 'demo',
            wpm: 159,
          },
          {
            name: 'brainPower',
            wpm: 213,
          },{
            name:'machine',
            wpm:23
          },{
            name: 'demo',
            wpm: 159,
          },
          
      ]
    };
  },
  methods: {
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    async getrecord(){
      try{
        const response = await getrecord(sessionStorage.getItem('userId'),1);
        console.log(response);
        this.list.splice(0,this.list.length);
        response.data.data.records.map((item)=>{
          this.list.push(item)
        })
      }catch(err){
        console.log(err)
      }
      this.list.map(async (item)=>{
        try{
          const response = await getContent(item.passageId);
          this.$set(item,'title',response.data.data.title);
        }catch(error){
          console.log(error)
        }
      })
    },
    async delrecord(id){
      try{
        const response = await delrecord(id);
        console.log(response);
        if(response.data.success==true ){
          this.$toast.error("丢人")
          this.list.map((item,index)=>{
            if(item.id == id){
              this.list.splice(index,1)
            }
          })
        }
        else{
          this.$toast.success("没有成功丢人")
        }
      }catch(error){
        console.log(error);
        this.$toast.success("丢脸")
      }
    }
  }
};
</script>