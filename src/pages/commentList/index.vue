<template lang="pug">
    .container
        .commentList
            .hotCommenList(v-for='(item,index) in comments.comments' :key='index')
                img(:src='item.user.avatarUrl')
                .content
                    .nickname {{item.user.nickname}}
                    .hotCommenContent {{item.content}}
</template>
<script>
import { getHttp } from "@/utils/index";
export default {
  data() {
    return {
      comments: [],
      commentsNum: 10
    };
  },
  methods: {
    getComment(num) {
      getHttp(
        `comment/music?id=${
          this.$store.state.playIngObject.playItem.id
        }&limit=${num}`
      ).then(res => {
        this.comments = res;
      });
    }
  },
  mounted() {
    this.commentsNum = 10;
    this.getComment(this.commentsNum);
  },
  onReachBottom() {
    if (
      (this.comments.total - 1) / 10 > this.commentsNum &&
      (this.comments.total - 1) / 10 - this.commentsNum > 10
    ) {
      this.commentsNum = this.commentsNum + 10;
    }
    this.getComment(this.commentsNum);
  }
};
</script>
<style scoped>
.hotCommenList {
  display: flex;
  justify-content: flex-start;
  margin-top: 40rpx;
}
.commentList img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50rpx;
}
.hotCommenList .nickname {
  font-size: 30rpx;
  color: #333;
  font-weight: 700;
}
.hotCommenList .hotCommenContent {
  font-size: 28rpx;
  color: #333;
  padding-top: 10rpx;
  padding-bottom: 20rpx;
}
.hotCommenList .content {
  width: 80%;
  padding: 0 5%;
}
.commentList {
  width: 90%;
  margin: 0 5%;
}
</style>


