<template>
<div class="person">
    <div class="person-container" @click="addTimes">
        <div class="avator">
            <img :src="imagePath" alt="">
            <!-- <img src="../../../static/avator_wang.png" alt=""> -->
            <div class="name">{{name}}</div>
        </div>
        <v-split></v-split>
        <div class="score">{{score}}</div>
    </div>
</div>
</template>

<script>
import Split from "../split/split.vue"

export default {
  name: 'Person',
  props: {
      detail: Object
  },
  data(){
      return{
          name: 'tecwang',
          score: 100,
          imagePath: ''
      }
  },
  created(){
      this.test();
      this.init();
  },
  methods: {
      init(){
          this.name = this.detail.name;
          this.score = this.detail.score;
          this.imagePath = this.detail.imagePath;
      },
      test(){
          console.log(this.detail.score);
      },
      addTimes(){
          this.score++;
      }
  },
  components: {
      'v-split': Split
  }
}
</script>

<style lang="stylus" scoped>
    @import "./person.styl";
</style>
