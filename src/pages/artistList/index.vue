<template>
    <div class="container">
        <div class="playHead">
            <div class="playHeadBackgroud" :style="{background:'url('+resData.playlist.coverImgUrl+')'}"></div>
            <div class="playHeadContent">
                <img :src="resData.playlist.coverImgUrl">
                <div class="title">
                     {{resData.playlist.name}}
                     <div>
                        <button v-for="(item,index) in resData.playlist.tags" :key="index">{{item}}</button>
                     </div>
                </div>
            </div>
        </div>
        <musicList :listData=resData.playlist.tracks></musicList>
        <pp v-if="storeState.playMusicDuration" :mode="min" :playIngTime=this.$store.state.playIngTime :playMusicDuration=this.$store.state.playMusicDuration :palyStatus=this.$store.state.palyStatus :playitem='this.$store.state.playIngObject.playItem'></pp>
    </div>    
</template>
<script>
import { getHttp } from "@/utils/index";
import musicList from "@/components/musicList";
import pp from "@/components/playPage";

export default {
  data() {
    return {
      resData: {
        playlist: {
          coverImgUrl: 'data:image/png;base64'
        }
      },
      storeState: this.$store.state,
    };
  },
  components: {
    musicList,
    pp
  },
  methods: {
    getPlayListDetail(data) {
      getHttp(`playlist/detail?id=${data.id}`).then(res => {
        this.resData = res;
        this.$store.commit("addPlayList", res.playlist.tracks);
        this.containerClass = 'show'
      });
    }
  },
  onShow() {
    this.getPlayListDetail(this.$store.state.clickInfo);
  }
};
</script>
<style scoped>
.playHead {
  width: 100%;
  height: 300rpx;
  position: relative;
}
.playHeadBackgroud {
  width: 100%;
  height: 300rpx;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(15px);
  position: absolute;
  left: 0;
  top: 0;
}
.playHeadContent {
  position: absolute;
  z-index: 9;
  display: flex;
  justify-content: flex-start;
  padding-top: 30rpx;
}
.playHeadContent img {
  width: 230rpx;
  height: 230rpx;
  margin-left: 20rpx;
}
.playHeadContent .title {
  font-size: 27rpx;
  color: #ffffff;
  letter-spacing: 2rpx;
  margin-left: 20rpx;
}
.playHeadContent .title div {
  display: flex;
  justify-content: flex-start;
  margin-top: 30rpx
}
.playHeadContent .title div button {
  font-size: 20rpx;
  letter-spacing: 1rpx;
  padding:8rpx 15rpx;
  margin: 0 10rpx;
  line-height: 30rpx;
  color:#ffffff;
  background-color: rgba(255, 255,255, 0.4);
  border: none
}
</style>


