<template>
  <mu-container class="con">
    <mu-dialog title="Result" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
    完成typing 用时{{time}} 速度 {{wpm}}words per minutes
    <mu-button slot="actions" flat color="primary" @click="$router.push('/list')">回到列表</mu-button>
    <mu-button slot="actions" flat color="primary" @click="restart">再试一次</mu-button>
    </mu-dialog>
  <mu-flex class="demo-linear-progress">
     <mu-linear-progress :value="linear" mode="determinate" color="green"></mu-linear-progress>
  </mu-flex>
    <mu-appbar style="width: 100%;padding:2%;" >
      用时:{{time}}s  wpm:{{wpm}}
    </mu-appbar>
    <mu-paper class="demo-paper" :z-depth="1">
    <div id="test">
      <span 
        class="letter"
        v-for="(char, index) in model"
        :key ="index"
        :style ="getcolor(index)"
        >
        {{char === " "? "_":char}}
      </span>
    </div>
    </mu-paper>
   
  </mu-container>
</template>
<script>
import ignoreKey from '../tools/tools.js';
import {addrecord,getContent} from '../apis/type.js'
export default {
  mounted(){
    var that = this;
    that.passageId =this.$route.params.id;
    this.getContent(this.$route.params.id);

    document.addEventListener("keydown", this.input);
    setInterval(
      function(){
        if(that.start == false){
          return
        }else{
          that.time +=1;
        }
      },1000
    )
  },
  unmounted() {
    document.removeEventListener("keydown", this.input);
  },
  data(){
    return{
      openAlert:false,
      passageId:0,
      time:0,
      start:false,
      title:'title',
      correct:[],
      correctWord:[],
      index:0,
      model:"this is test model, if you see this , please check the internet",
    }
  },
  methods:{
    input(event){
        if(this.index==this.maxn){
          this.start = false;
          this.$toast.success("完成")
          document.removeEventListener("keydown",this.input);
          this.handleWpm();
          return;
        }
        const model =this.model;
        const correct = this.correct;
        if (ignoreKey.indexOf(event.key)!=-1) {
          console.log("retyr")
          return;
        } else if (event.key === "Backspace") {
          correct.pop();
          if(this.index>0){
            if(this.model[this.index]==" "){
              this.correctWord.pop();
            }
            this.index--;
          }
        } else if (event.key === "Enter") {
          correct.push("\n" === model[this.index]);
          this.index++;
        } else {
          this.start = true;
          if(event.key == ' '){
            event.preventDefault();//文本过长时 按空格键会下滑需要preventDefault;
            console.log("preventDefault");
          }
          correct.push(event.key ===model[this.index]);
          this.index++;
          if(event.key==" "){
            this.correctWord.push(true);
            for(let scan =this.index;this.model[scan]!=" ";scan--){
              if(this.correct[scan]==false){
                this.correctWord[this.correctWord.length-1] = false;
                break;
              }
            }
          }
        }
        
        const text = document.getElementById("test");

        const currentNode = text.childNodes[this.index];
        if(currentNode.getBoundingClientRect().bottom>(window.innerHeight/2)){
          window.scrollBy(0,48);
        }
    },
    getcolor(index){
      const correct = this.correct;
      let color;
      if(correct[index]==undefined){
        color = 'grey'
      }else if(correct[index]==true){
        color = '#42b983'
      }else{
        color = 'red'
      }
      return {
        color:color
      }
    },
    async handleWpm(){
      try{
        const response= await addrecord(this.passageId,sessionStorage.getItem('userId'),this.wpm);
        console.log(response);
        if(response.data.success == true){
          this.$toast.success("上传成绩成功");
          this.openAlert = true;
        }
      }catch(err){
        console.log(err);
      }
    },
    async getContent(id){
      try{
        const response =await getContent(id);
        console.log(response);
        this.title = response.data.data.title;  
        this.model = response.data.data.content;
      }catch(error){
        console.log(error)
      }
    },
    restart(){
      this.start = false;
      this.time = 0;
      this.correct.splice(0,this.correct.length)
      this.correctWord.splice(0,this.correctWord.length);
      this.index = 0;
      document.addEventListener("keydown", this.input);
      this.openAlert =false;
    }
  },
  computed:{
      maxn(){
      return this.model.length;
    },
    linear(){
      return 100*this.index/this.maxn
    },
    wpm(){
      //计算正确的单词个数
      let count = this.correctWord.reduce((sum,item)=>{
        if(item==true){
          sum+=1;
        }
        return sum
      },0)
     
      return Math.round(10*60*count/(this.time))/10;
    }
  }
}
</script>
<style scoped>
  
  .letter {
    font-size: 20px;
    font-weight: 500;
    transition-duration: 0.2s;
    font-family: 'typeface-roboto';
  }
  .demo-paper{
    padding:3%;
  }
  .demo-linear-progress{
    margin:2%;
  }
</style>