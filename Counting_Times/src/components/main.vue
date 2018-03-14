<template>
  <div class="box">
    <div class="date top-button">{{date}}</div>
    <div class="persons">
      <div class="persons-box">
        <div v-for="person in persons" v-bind:key="person.name">
          <v-person :detail="person" @add="writeLocal"></v-person>
        </div>
      </div>
    </div>
    <div class="back-tracking top-button">历史记录</div>
    <!-- <v-timer class="timer-container"></v-timer> -->
  </div>
</template>



<script>
import Person from "./person/person.vue"
import Timer from "./timer/timer.vue"


// 将json数据转换为本地长期数据
import Data from "../common/data/person.json"
let date = new Date();
let curdate = date.getMonth() + '-' + date.getDate();
let tardata = localStorage.getItem(curdate);
if(localStorage.getItem(curdate)){
  console.log('data already exists!');
  tardata = JSON.parse(tardata);
}else{
  localStorage.setItem(`${date.getMonth()}-${date.getDate()}`, JSON.stringify(Data));
  tardata = Data;
}

export default {
  name: 'Main',
  data(){
    return {
      date: '',
      persons: {}
    }
  },
  mounted(){
    setTimeout(() => {
      this.init();
    }, 100);
  },
  methods: {
    init(){
      this.updateTime();
      let timer = setInterval(this.updateTime, 1000);
      this.persons = tardata.data;
    },
    writeLocal(name){
      console.log(name);
    },
    updateTime(){
      let d = new Date();
      this.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  },
  components: {
    "v-person": Person,
    "v-timer": Timer
  }
}
</script>


<style lang="stylus" scoped>
  .box
    height 100%
    width 100%
    position relative
    .date
      position absolute
      left 20px
      top 60px
      font-size 80px
      color pink
    .back-tracking
      position  absolute 
      top 20px
      right 20px
      background-color pink
    .persons
      position absolute
      left 0
      top 60px
      bottom 0
      width 100%
      box-sizing border-box
      padding 20px
      .persons-box
        // border 1px solid gray
        height 100%
        display flex
        justify-content center
        align-items center
    .timer-container
      position absolute
      bottom 40px
      width 80%
      left 50%
      margin-left -40%
  .top-button
    box-sizing border-box
    height 40px
    line-height 40px
    padding 0 20px
    border-radius 5px
    cursor pointer
</style>
