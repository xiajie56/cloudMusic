<template lang="pug">
    .container
        .searchList(v-for="(item,index) in searchObject" :key="index" @click="playThisMusic(item)") {{item.name}}
        pp(mode='hide' ref="c1") 
</template>
<script>
import { getHttp } from "@/utils/index";
import pp from "@/components/playPage";
export default {
  props: {
    searchObject: {
      type: Object,
      default: {}
    },
    listData: {
      type: Array,
      default: []
    }
  },
  components: {
    pp
  },
  data() {
    return {};
  },
  methods: {
    songDetail(id){
      this.$http(`/song/detail?ids=${id}`).then(res=>{
        this.$store.commit("changePlayMusicItem", res.songs[0]);
        this.$refs.c1.paly(id);
      })
    },
    playThisMusic(item) {
      this.songDetail(item.id)
    }
  }
};
</script>
<style scoped>
.searchList {
  width: 90%;
  padding: 15rpx 5%;
  border-bottom: 1px solid #eeeeee;
  font-size: 25rpx;
}
</style>



