<template lang="pug">
    .container(:class="mode")
        .playHeadBackgroud(v-if="playitem.al" :style="{background:'url('+playitem.al.picUrl+')'}")
        .minView
            img.down(v-if="mode=='max'" src='/static/down_icon.png' @click='playType()')
            img.coverImgUrl(v-if="playitem.al&&mode=='min'" :src="playitem.al.picUrl" @click='playType()')
            img.coverImgUrl(v-if="playitem.al&&mode=='max'" :src="playitem.al.picUrl" @click='clickMusicDetails()')
            img.palyEnshrine(v-if="mode=='max'" src='/static/like.png')
            .coverName(v-if='playitem') {{playitem.name}}
            .coverAlName(v-if='playitem.al') {{playitem.al.name}}
            .musicDuration
              img.prev(v-if="mode=='min'" src='/static/play_up_icon.png' @click='prev')
              img.prev(v-if="mode=='max'" src='/static/play_up_icon1.png' @click='prev')
              img.pauseAndPlay(v-if="pauseAndPlayText==0&&mode=='min'" src='/static/play_p_icon.png' @click='pauseAndPlay()')
              img.pauseAndPlay(v-if="pauseAndPlayText==1&&mode=='min'" src='/static/play_icon.png' @click='pauseAndPlay()')
              img.pauseAndPlay(v-if="pauseAndPlayText==0&&mode=='max'" src='/static/play_p_icon1.png' @click='pauseAndPlay()')
              img.pauseAndPlay(v-if="pauseAndPlayText==1&&mode=='max'" src='/static/play_icon1.png' @click='pauseAndPlay()')
              img.next(v-if="mode=='min'" src='/static/play_next_icon.png' @click='next')
              img.next(v-if="mode=='max'" src='/static/play_next_icon1.png' @click='next')
            .palyStatusIdentify(v-if="mode=='max'")
              img.palyStatus(v-if='palyStatus==0' src='/static/play_c_icon.png' @click='status')
              img.palyStatus(v-if='palyStatus==1' src='/static/play_1_icon.png' @click='status')
              img.palyStatus(v-if='palyStatus==2' src='/static/play_r_icon.png' @click='status')  
            .palyProgress
              //- .playIngTime {{playIngTime/60}} 
              progress(color="#d4237a" stroke-width="3" :percent="playIngTime/playMusicDuration*100")
              //- .playMusicDuration {{(playMusicDuration/60)}}
            .commentList(v-if="playitem&&mode=='max'")
              .total 总评论{{commentList.total}}
              .hotCommenList(v-for='(item,index) in commentList.hotComments' :key='index')
                img(:src='item.user.avatarUrl')
                .content
                  .nickname {{item.user.nickname}}
                  .hotCommenContent {{item.content}}
                  //- .commentLikedCount {{item.likedCount}}  
              .seeMore(@click='toSeeMore()') 查看更多评论>              
</template>
<script>
import { getHttp } from "@/utils/index";
export default {
  props: {
    mode: {
      type: String,
      default: "min"
    },
    playIngTime: {
      type: Infinity,
      default: 0
    },
    playMusicDuration: {
      type: Infinity,
      default: 0
    },
    palyStatus: {
      type: Infinity,
      default: 0
    },
    playitem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      innerAudioContext: this.$store.state.innerAudioContext,
      pauseAndPlayText: 0,
      playMusicItem: {},
      commentList: {}
    };
  },
  methods: {
    tms() {
      return;
    },
    paly(id) {
      if (this.$store.state.playIngTime) {
        this.innerAudioContext.stop();
      }
      this.innerAudioContext.autoplay = false;
      this.innerAudioContext.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.innerAudioContext.play();
      this.innerAudioContext.onPlay(() => {
        console.log("开始播放");
      });
      this.innerAudioContext.onError(res => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
      this.innerAudioContext.onTimeUpdate(() => {
        this.$store.commit("setPlay", {
          playIngTime: this.innerAudioContext.currentTime,
          playMusicDuration: this.innerAudioContext.duration
        });
      });
      this.innerAudioContext.onEnded(() => {
        console.log("播放结束", this.$store.state.palyStatus);
        let palyStatus = this.$store.state.palyStatus;
        let playList = this.$store.state.playIngObject.playList;
        let playItem = this.$store.state.playIngObject.playItem;
        if (palyStatus === 0) {
          this.innerAudioContext.loop = false;
          this.next();
        } else if (palyStatus === 1) {
          this.innerAudioContext.loop = true;
        } else if (palyStatus === 2) {
          this.innerAudioContext.loop = false;
          this.setPlayMusic(
            playList[Math.floor(Math.random() * playList.length)]
          );
        }
      });
    },
    pauseAndPlay() {
      if (this.$store.state.isPlay) {
        this.innerAudioContext.pause();
        this.$store.commit("changeIsPlay", 0);
        this.pauseAndPlayText = 1;
      } else {
        this.innerAudioContext.play();
        this.$store.commit("changeIsPlay", 1);
        this.pauseAndPlayText = 0;
      }
    },
    setPlayMusic(item) {
      this.$store.commit("changePlayMusicItem", item);
      this.paly(item.id);
    },
    prev() {
      let playList = this.$store.state.playIngObject.playList;
      let playItem = this.$store.state.playIngObject.playItem;
      for (let i in playList) {
        if (playList[i] === playItem) {
          this.setPlayMusic(
            parseInt(i) - 1 < 0
              ? playList[playList.length - 1]
              : playList[parseInt(i) - 1]
          );
        }
      }
    },
    next() {
      let playList = this.$store.state.playIngObject.playList;
      let playItem = this.$store.state.playIngObject.playItem;
      for (let i in playList) {
        if (playList[i] === playItem) {
          this.setPlayMusic(
            parseInt(i) + 1 === playList.length
              ? playList[0]
              : playList[parseInt(i) + 1]
          );
        }
      }
    },
    status() {
      console.log(this.$store.state.palyStatus, this.palyStatus);
      switch (this.$store.state.palyStatus) {
        case 0:
          this.$store.commit("setPalyStatus", 1);
          break;
        case 1:
          this.$store.commit("setPalyStatus", 2);
          break;
        case 2:
          this.$store.commit("setPalyStatus", 0);
          break;
      }
    },
    clickMusicDetails() {
      wx.navigateTo({
        url: "../musicDetails/main"
      });
    },
    playType() {
      if (this.mode === "min") {
        this.mode = "max";
      } else if (this.mode === "max") {
        this.mode = "min";
      }
    },
    toSeeMore() {
      wx.navigateTo({
        url: "../commentList/main"
      });
    }
  },
  mounted() {
    if (this.playitem.id) {
      getHttp(`comment/music?id=${this.playitem.id}`).then(res => {
        this.commentList = res;
      });
    }
    console.log(this.mode)
  }
};
</script>
<style lang="stylus" scoped>
.container {
  width: 750rpx;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 9;
  left: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.max.container {
  background: rgba(255, 255, 255, 1);
}

.playHeadBackgroud {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  position: absolute;
  left: 0;
  top: 0;
}

.max .playHeadBackgroud {
  filter: blur(70px);
}

.min {
  height: 110rpx;
  display: flex;
  bottom: 0;
}

.max {
  height: 100%;
  display: flex;
  bottom: 0;
}

.min .coverImgUrl {
  width: 80rpx;
  height: 80rpx;
  margin-top: 13rpx;
  margin-left: 10rpx;
  margin-bottom: 3rpx;
}

.min .minView {
  // display flex;
  // justify-content space-between
}

.min .minView, .max .minView {
  color: #fff;
  height: 100%;
  width: 100%;
  position: relative;
}

.min .musicDuration img {
  width: 40rpx;
  height: 40rpx;
}

.min .palyStatusIdentify img {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  right: 20rpx;
  top: 30rpx;
}

.hide {
  display: none;
}

.musicDuration, .palyProgress {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.min .musicDuration {
  display: flex;
  width: 30%;
  justify-content: space-between;
  position: absolute;
  right: 27px;
  top: 30rpx;
}

.palyProgress {
  justify-content: space-between;
}

.palyProgress progress {
  width: 100%;
}

.palyProgress .playIngTime, .palyProgress.playMusicDuration {
  width: 20%;
}

.palyStatusIdentify {
  width: 100%;
  // height: 30rpx;
}

.min .coverName {
  font-size: 25rpx;
  color: #fff;
  position: absolute;
  top: 20rpx;
  left: 130rpx;
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.min .coverAlName {
  color: #fff;
  position: absolute;
  left: 130rpx;
  top: 55rpx;
  font-size: 20rpx;
  width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.max .down {
  width: 60rpx;
  height: 50rpx;
  position: absolute;
  left: 10rpx;
  top: 10rpx;
}

.max .coverImgUrl {
  width: 100%;
  height: 340px;
}

.max .musicDuration {
  display: flex;
  width: 50%;
  margin: 30rpx 25%;
  justify-content: space-between;
}

.max .musicDuration img {
  width: 50rpx;
  height: 50rpx;
}

.max .palyProgress {
  position: absolute;
  top: 680rpx;
}

.max .coverName {
  font-size: 35rpx;
  text-align: center;
  margin-top: 30rpx;
  color: #333;
}

.max .coverAlName {
  font-size: 25rpx;
  text-align: center;
  color: #333;
}

.max .palyStatusIdentify img {
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  left: 30rpx;
  top: 837rpx;
}

.max .palyEnshrine {
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  right: 30rpx;
  top: 837rpx;
}

.max .commentList {
  width: 90%;
  // height: 320rpx;
  // overflow-y: scroll;
  margin: 0 5%;
}

.max .hotCommenList {
  display: flex;
  justify-content: flex-start;
  margin-top: 40rpx;
}

.max .commentList img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50rpx;
}

.max .hotCommenList .nickname {
  font-size: 30rpx;
  color: #333;
  font-weight: 700;
}

.max .hotCommenList .hotCommenContent {
  font-size: 28rpx;
  color: #333;
  padding-top: 10rpx;
  padding-bottom: 20rpx;
}

.max .hotCommenList .content {
  width: 80%;
  padding: 0 5%;
}

.max .total {
  font-size: 30rpx;
  color: #000;
}

.commentList::-webkit-scrollbar {
  display: none;
}

.max .seeMore {
  font-size: 28rpx;
  color: #333;
  text-align: center;
  height: 100rpx;
  margin-top: 50rpx;
}
</style>