<template lang="pug">
    .container
        .hotCommenList(v-for='(item,index) in commentList.hotComments' :key='index')
                img(:src='item.user.avatarUrl')
                .content
                  .nickname {{item.user.nickname}}
                  .hotCommenContent {{item.content}}
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{

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
</style>


