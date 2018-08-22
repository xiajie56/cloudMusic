<template lang="pug">
    .container
        img.detailsImg(mode="widthFix" :src='playItem.al.picUrl')
        .lyric
            .lyricItem(v-for='(item,index) in lyric' :key='index' :data-time='item.time' :class='') {{item.text}}
        .discuss
</template>
<script>
import { getHttp } from "@/utils/index";
export default {
  data() {
    return {
      playItem: {},
      lyric: [],
      playIngTime: 0,
      timeInteral: 0
    };
  },
  components: {},
  methods: {
    getLyric() {
      getHttp(`lyric?id=${this.$store.state.playIngObject.playItem.id}`).then(
        res => {
          let thisArr = res.lrc.lyric.replace(/[\n\r]/g, "^").split("^");
          for (let i in thisArr) {
            let len = thisArr[i].indexOf("]") + 1;
            thisArr[i] = {
              time: thisArr[i].substr(0, len).replace(/\[\]/g, "^"),
              text: thisArr[i].substr(len, thisArr[i].length)
            };
          }
          this.lyric = thisArr;
          this.showLyricClass();
        }
      );
    },
    showLyricClass() {
      // let getTime = time => {
      //   console.log(time)
      // };
      // this.timeInteral = setInterval(() => {
      //   getTime(this.$store.state.playIngTime);
      // }, 10);
    }
  },
  onShow() {
    this.playItem = this.$store.state.playIngObject.playItem;
    this.getLyric();
  },
  onUnload(){
    clearInterval(this.timeInteral)
  }
};
</script>

<style lang="stylus" scoped>
.detailsImg {
  width: 100%;
  height: 20rpx;
}
</style>

