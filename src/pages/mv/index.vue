<template lang="pug">
    .container
        .video(v-for="(item,index) in videoList" :key="index")
            video(:src='item.brs.one' :poster='item.cover' :id="'video'+item.id" @play="settingVideo(item.id)")
            .title {{item.name}}
</template>
<script>
export default {
    data(){
        return{
            limit:10,
            videoList:[],
            videoIdList:[],
            playIngVideoID:''
        }
    },
    methods:{
        settingVideo(id){
            if(this.playIngVideoID){
                let prevV = wx.createVideoContext(this.playIngVideoID);
                prevV.pause()
            }
            let videoContext = wx.createVideoContext('video'+id);
            videoContext.play();
            this.playIngVideoID = 'video'+id;
        },
        getMVDetails(id){
            this.videoIdList.push('video'+id)
            this.$http(`/mv?mvid=${id}`).then(res=>{
                for(let i in res.data.brs){
                    switch(i){
                        case '240':
                            res.data.brs['one'] = res.data.brs[i]
                        break;
                        case '480':
                            res.data.brs['two'] = res.data.brs[i]
                        break;
                        case '720':
                            res.data.brs['three'] = res.data.brs[i]
                        break;
                        case '1080':
                            res.data.brs['four'] = res.data.brs[i]
                        break;
                    }
                }
                this.videoList.push(res.data)
            })
        },
        getMVList(){
            this.$http(`top/mv?limit=${this.limit}`).then(res=>{
                res.data.forEach(element => {
                    this.getMVDetails(element.id)
                });
            })
        }
    },
    mounted(){
        this.getMVList()
    },
    onReachBottom() {
        this.limit+=10;
        this.getMVList()
    }
}
</script>
<style lang="stylus" scoped>
    .video
        video
           width:730rpx;
           height:430rpx;
           border-radius:10rpx;

        .title
            font-size 30rpx
            padding-bottom 30rpx
</style>
