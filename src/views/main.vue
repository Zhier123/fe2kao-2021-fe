<template>
  <mu-container class="con">
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
export default {
  mounted(){
    document.addEventListener("keydown", this.input);
    var that = this;
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
      time:0,
      start:false,
      title:'title',
      correct:[],
      index:0,
      model:"In Unit 6, you have learned about the U.S educational system, its educational institutions, and its educational objectives ( or philosophy). As far as China's educational system and educational philosophy are concerned, please write an essay about what you like and dislike most about your school life based on your own experience and your observations. Your writing should be no less than 300 words.",
    }
  },

  methods:{
    input(event){
        const model =this.model;
        const correct = this.correct;
        if (ignoreKey.indexOf(event.key)!=-1) {
          console.log("retyr")
          return;
        } else if (event.key === "Backspace") {
          correct.pop();
          if(this.index>0){
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
      let count=0;
      let i=0;
      let size = this.correct.length;
      while(i<size){
        let allright =true
        while(this.model[i]!=' '){
          if(this.correct[i]==false){
            allright = false;
          }
          i++;
        }
        if(allright == true){
          count +=1;
        }
        i++;
      }
       return Math.round(10*60*count/(this.time))/10;//会稍微高一点有无更好的算法？
       
    }
  }
}
</script>
<style scoped>
  
  .letter {
    font-size: 20px;
    font-weight: 500;
    font-family: 'typeface-roboto';
  }
  .demo-paper{
    padding:3%;
  }
  .demo-linear-progress{
    margin:2%;
  }
</style>