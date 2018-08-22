<template>
  <div class="container">
      <!-- <scroll-view scroll-y="true" @scrolltolower="lower"> -->
        <div class="search">
          <view class="section">
            <input placeholder="搜索喜欢的歌曲" @click="playSearch()"/>
            <img src="/static/icon_seach.png">
          </view>
        </div>
        <swiper indicator-dots="true" autoplay="true">
          <block>
            <swiper-item v-for="(item,index) in bannerList" :key="index">
            <image :src='item.picUrl' class="slide-image" mode="widthFix"/>
            </swiper-item>
          </block>
        </swiper>
        <div class="title">歌单 (网友精选碟 )</div>
        <!-- <title text="分类列表"></title> -->
        <musicList></musicList>
      <!-- </scroll-view> -->
    </div>
</template>

<script>
import { getHttp } from "@/utils/index";
// import title from "@/components/card";
import musicList from "@/components/list";
export default {
  data() {
    return {
      bannerList: []
    };
  },

  components: {
    // title,
    musicList
  },

  methods: {
    getBanner() {
      getHttp("banner").then(res => {
        this.bannerList = res.banners;
      });
    },
    playSearch(){
       wx.navigateTo({
        url: "../search/main"
      });
    }
  },
   onPullDownRefresh() {
    console.log("=====");
  },
  // onReachBottom(){
  //   console.log('===')
  // },
  created() {
    this.getBanner();
  }
};
</script>

<style scoped>
swiper {
  width: 750rpx;
  height: 300rpx;
  margin-top: 50rpx;
}
.slide-image {
  width: 750rpx;
}
.title {
  color: #333333;
  margin-top: 20rpx;
  font-size: 35rpx;
}
.search{
  position: fixed;
  z-index: 9;
  width: 100%;
  background-color: #ffffff;
  height:70rpx;
  display: flex;
  justify-content: center
}
.section {
  width: 90%;
  height: 50rpx;
  font-size: 20rpx;
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  border-radius: 20rpx;
  position: relative;
}
.section input {
  width: 97%;
  padding-left: 55rpx;
  letter-spacing: 2rpx;
  font-weight: 300;
}
.section img {
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  left: 17rpx;
  top: 14rpx;
}
.title{
  font-size: 30rpx;
  width: 100%;
  height: 60rpx;
  margin-left: 20rpx
}
</style>
