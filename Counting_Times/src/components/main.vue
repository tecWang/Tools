<template>
  <div class="box">
    <div class="date top-button">{{date}}</div>
    <div class="persons">
      <div class="persons-box">
        <div v-for="person in persons" v-bind:key="person.name">
          <v-person :detail="person"></v-person>
        </div>
      </div>
    </div>
    <div class="back-tracking top-button">历史记录</div>
  </div>
</template>

<script>
import Person from "./person/person.vue"
import Data from "../common/data/person.json"


export default {
  name: 'Main',
  data(){
    return {
      date: '',
      persons: {}
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      let d = new Date();
      this.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      this.persons = Data.data;
    }
  },
  components: {
    "v-person": Person
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
      top 20px
    .back-tracking
      position  absolute 
      top 20px
      right 20px
      background-color skyblue
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
  .top-button
    box-sizing border-box
    height 40px
    line-height 40px
    padding 0 20px
    border-radius 5px
    cursor pointer
</style>
