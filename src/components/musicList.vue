<template lang="pug">
    .container
        .listItem(v-for="(item,index) in listData" :key="index" @click="playThisMusic(item)")
          .listContent
            img.picUrl(:src='item.al.picUrl')
            .allName
              .listName {{item.name}}
              .listAlName {{item.al.name}}
            img.music_icon(src='/static/music_icon.png')
        pp(mode='hide')        
</template>
<script>
import { getHttp } from "@/utils/index";
import pp from "@/components/playPage";
export default {
  props: {
    listData: {
      type: Array,
      default: []
    }
  },
  components: {
    pp
  },
  methods: {
    //this.$refs()
    playThisMusic(item) {
      console.log(this.$children)
      this.$store.commit('changePlayMusicItem',item)
      for (let c of this.$children) {
        c.paly(item.id)
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.container{
  margin-bottom 150rpx;
  min-height 400rpx
}
.listItem {
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 30rpx;
    color: #333;
    width: 100%;
    margin-top 50rpx
}
.listContent{
  width 90%;
  margin 0 5%;
  display flex;
  justify-content flex-start;
  align-items: center;
  position relative;
}
.listItem .listContent .picUrl {
  width 100rpx;
  height 100rpx;
}
.allName{
  margin-left 50rpx;
  width 500rpx
}
.listName{
  font-size 30rpx;
  color #333333;
  width:85%;
}
.listAlName{
   font-size 20rpx;
   width:85%;
   color #cccccc
}
.music_icon{
  position absolute;
  right 30rpx;
  width 50rpx;
  height 50rpx;
}
</style>



