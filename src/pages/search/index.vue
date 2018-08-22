<template lang="pug">
  .container
    .search
        view.section
            input(confirm-type='search' focus='true' @input='bindinput' v-model="inputText"  placeholder="搜索喜欢的歌曲" )
            <img src="/static/icon_seach.png">
    .searchList(v-if='inputText.length==0')
        .classify 历史搜索
        .searchName
            button(v-for='(ietm,index) in historyList' :key='index' @click='rapidSearch(ietm)') {{ietm}}
        .classify 热门搜索
        .searchName
            button(v-for='(ietm,index) in hotsList' :key='index' @click='rapidSearch(ietm.first)') {{ietm.first}}
    searchList(v-if='inputText.length>0' :searchObject='searchObject')
    <pp v-if="storeState.playMusicDuration" mode='min' :playIngTime=this.$store.state.playIngTime :playMusicDuration=this.$store.state.playMusicDuration :palyStatus=this.$store.state.palyStatus :playitem='this.$store.state.playIngObject.playItem'></pp>
</template>
<script>
import { getHttp } from "@/utils/index";
import searchList from "@/components/searchList";
import pp from "@/components/playPage";
export default {
  data() {
    return {
      inputText: "",
      searchObject: {},
      hotsList: [],
      searchHistory: [],
      historyList: [],
      storeState: this.$store.state
    };
  },
  components: {
    searchList,
    pp
  },
  methods: {
    search(inputText) {
      getHttp(`search?keywords=${inputText}`).then(res => {
        this.searchObject = res.result.songs;
      });
    },
    searchHot() {
      getHttp(`search/hot`).then(res => {
        this.hotsList = res.result.hots;
      });
    },
    bindinput() {
      this.search(this.inputText);
      this.searchHistory.push(this.inputText);
      wx.setStorageSync("searchHistoryKey", this.searchHistory);
    },
    rapidSearch(text) {
      this.inputText = text;
      this.search(text);
    }
  },
  mounted() {
    this.historyList = wx.getStorageSync("searchHistoryKey");
    this.searchHot();
  }
};
</script>
<style lang="stylus" scoped>
.search {
    width: 100%;
    background-color: #ffffff;
    height: 70rpx;
    display: flex;
    justify-content: center;
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

.searchList {
    width: 90%;
    margin: 20rpx 5%;
}

.searchList .classify {
    font-size: 30rpx;
    font-width: 500;
}

.searchList .searchName {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;
    padding-bottom: 30rpx;
}

.searchList .searchName button {
    background-color: #ffffff;
    margin: 10rpx;
    padding: 2rpx 15rpx;
    border: 1rpx solid #cccccc;
    outline: none;
    line-height: 50rpx;
    font-size: 26rpx;
    border-radius: 20rpx;
    color: #333333;
}
</style>


