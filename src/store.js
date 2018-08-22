import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex)

const store = new vuex.Store({
    state: {
        clickInfo: {},//首頁點擊进来的object
        playIngTime: 0,//歌曲播放实际进度
        playMusicDuration: 0, //歌曲时长
        innerAudioContext: wx.createInnerAudioContext(), //微信播放控件
        playIngObject: {//播放列表以及当前播放歌曲信息
            playList: [],
            playItem: {}
        },
        isPlay: 1,//是否在播放
        palyStatus:0//0循环播放，1单曲循环，2随机播放
    },
    mutations: {
        setClickInfo(state, obj) {
            state.clickInfo = obj;
        },
        setPlay(state, data) {
            state.playIngTime = data.playIngTime;
            state.playMusicDuration = data.playMusicDuration;
        },
        addPlayList(state, data) {
            state.playIngObject.playList = data;
        },
        changePlayMusicItem(state, data) {
            state.playIngObject.playItem = data;
        },
        changeIsPlay(state, data) {
            state.isPlay = data;
        },
        setPalyStatus(state,data){
            state.palyStatus=data;
        }
    },
})

export default store