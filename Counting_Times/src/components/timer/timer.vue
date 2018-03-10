<template>
  <div class="timer">
      <div class="busy">忙碌</div>
      <div class="easy">闲暇</div>
      <div class="mask"></div>
  </div>
</template>

<script>
export default {
    name: 'timer',
    mounted(){
        this.init();
    },
    methods: {
        init(){
            this.moveRight();
        },
        moveRight(){
            let mask = document.querySelector('.mask');
            // let timeSr = setInterval(function(){
                // console.log(mask.style);
            // },100000);
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "./timer.styl";
</style>


