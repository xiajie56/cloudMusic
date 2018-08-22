<template>
  <!-- <scroll-view scroll-y="true" @scrolltolower="lower"> -->
      <div class="container">
          <div v-for="(item,index) in list" :key="index" class="musicList" @click="itemCLick(item)">
            <img :src="item.coverImgUrl" mode="widthFix">
            <div class="title" v-text="item.name"></div>
          </div>
      </div>
    <!-- </scroll-view> -->
</template>

<script type="text/ecmascript-6">
import { getHttp } from "@/utils/index";
export default {
  name: "list",
  props: [],
  data() {
    return {
      list: []
    };
  },
  methods: {
    musicList() {
      getHttp("top/playlist").then(res => {
        console.log(res);
        this.list = res.playlists;
      });
    },
    itemCLick(obj) {
      this.$store.commit("setClickInfo", obj);
      wx.navigateTo({
        url: "../artistList/main"
      });
    }
    // lower(e) {
    //   console.log(e);
    // }
  },
  created() {
    this.musicList();
  }
  // onPullDownRefresh() {
  //   console.log("=====");
  // }
};
</script>
<style scoped>
.container {
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
scroll-view {
  background-color: #ffffff
}
.musicList:first-child,
.musicList:nth-child(2) {
  margin-top: 0;
}
.musicList {
  width: 50%;
  height: 200rpx;
  background: #ffffff;
  margin: 150rpx 0;
}
.musicList img {
  height: 200rpx;
  width: 100%;
}
.musicList .title {
  width: 90%;
  margin: 10rpx 5%;
  font-size: 30rpx;
}
</style>

