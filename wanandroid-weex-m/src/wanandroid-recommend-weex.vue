<template>
  <list class="content-wrap">
    <refresh class="loading-wrap" :display="refreshStatus.display" @refresh="onRefresh">
      <text class="loading-text">{{refreshStatus.refreshMsg}}</text>
      <loading-indicator class="loading-indicator"></loading-indicator>
    </refresh>
    <cell>
      <slider 
      class="slider-wrap" 
      interval="5000" 
      scrollable="true"
      infinite="true"
      show-indicators="true"
      auto-play="true">
        <div class="slider-item" @click="clickOpenDetail(item.url)"
            v-for="(item, index) in homeBanners" :key="index">
          <image class="slider-img" resize="cover" :src="item.imagePath"></image>
          <div class="slider-title-wrap">
            <text class="slider-title">{{item.title}}</text>
          </div>
        </div>
        <indicator 
        class="slider-indicator"
        item-color="#cccccc"
        item-selected-color="#60d5cf"
        item-size="12"
        ></indicator>
      </slider>
    </cell>
    <cell v-for="(item, index) in homeArticles" :key="index">
      <cube-article :data="item"></cube-article>
      <div class="line"></div>
    </cell>
    <loading 
      v-if="!isArticleOver"
      class="loading-wrap" 
      :display="loadingStatus.display" 
      @loading="onLoadMore">
      <text class="loading-text">{{loadingStatus.loadingMsg}}</text>
      <loading-indicator class="loading-indicator"></loading-indicator>
    </loading>
  </list>
</template>

<style scoped>
.loading-wrap {
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
}
.loading-text {
  font-size: 30px;
  color: #928787;
  margin-right: 20px;
}
.loading-indicator {
  height: 50px;
  width: 50px;
  color: turquoise;
}
.line {
  height: 2px;
  background-color: #efefef;
}
.slider-wrap {
  width: 750px;
  height: 400px;
}
.slider-indicator {
  position: absolute;  
  width: 750px;
  height: 400px;
  top: 160px;
  left: 200px;
}
.slider-item {
  width: 750px;
  height: 400px;
}
.slider-img {
  width: 750px;
  height: 400px;
}
.slider-title-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 750px;
  background-color: #000;
  opacity: 0.5;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
}
.slider-title {
  padding-left: 20px;
  font-size: 30px;
  color: white;
} 
</style>

<script>
  import './widget';
  import { request } from '../components/mixins/weex-mixins';
  import Article from '../components/cube-article';

  export default {
    components: {
      'cube-article': Article,
    },
    data() {
      return {
        height: weex.config.env.deviceHeight,
        width: weex.config.env.deviceWidth,
        /**
            "desc": "一起来做个App吧",
            "id": 10,
            "imagePath": "http://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png",
            "isVisible": 1,
            "order": 0,
            "title": "一起来做个App吧",
            "type": 0,
            "url": "http://www.wanandroid.com/blog/show/2"
         */
        homeBanners: [],
        /**
          "apkLink": "",
          "author": "张明云",
          "chapterId": 296,
          "chapterName": "阅读",
          "collect": false,
          "courseId": 13,
          "desc": "",
          "envelopePic": "",
          "fresh": false,
          "id": 2798,
          "link": "https://www.jianshu.com/p/2f93483b8b39",
          "niceDate": "2018-04-08",
          "origin": "",
          "projectLink": "",
          "publishTime": 1523196084000,
          "superChapterId": 181,
          "superChapterName": "延伸技术",
          "tags": [],
          "title": "如何衡量一个Android应用开发人员的能力？",
          "type": 0,
          "visible": 1,
          "zan": 0
         */
        homeArticles: [],
        loadingStatus: {
          display: 'hide',
          loadingMsg: '上拉加载更多...',
        },
        refreshStatus: {
          display: 'hide',
          refreshMsg: '刷新数据...',
        },
        isArticleOver: false,
        curPage: 0,
        apiBanner: '/banner/json',
        apiArticleList: '/article/list/',
      };
    },
    mixins: [request],
    created() {
      const self = this;
      self.requestBanners();
      self.requestArticles();
    },
    methods: {
      // 点击打开 web
      clickOpenDetail(link) {
        this.$router.openWeb(link);
      },
      onRefresh() {
        const self = this;
        self.homeBanners.splice(0, self.homeBanners.length);
        self.homeArticles.splice(0, self.homeArticles.length);
        self.curPage = 0;
        self.refreshStatus.display = 'show';
        self.refreshStatus.loadingMsg = '请稍候...';
        self.requestBanners();
        self.requestArticles(() => {
          self.refreshStatus.display = 'hide';
          setTimeout(() => {
            self.refreshStatus.loadingMsg = '刷新数据...';
          }, 500);
        });
      },
      onLoadMore() {
        const self = this;
        if (self.isArticleOver) {
          this.$modal.toast('没有更多数据');
          self.loadingStatus.display = 'hide';
          return;
        }
        self.loadingStatus.display = 'show';
        self.loadingStatus.loadingMsg = '请稍候...';
        this.requestArticles(() => {
          self.loadingStatus.display = 'hide';
          setTimeout(() => {
            self.loadingStatus.loadingMsg = '上拉加载更多...';
          }, 500);
        });
      },
      requestArticles(finishCallback) {
        const self = this;
        self.requestWanAndroid({
          url: `${self.apiArticleList}${self.curPage}/json`,
        }, (data) => {
          data.datas.forEach((item) => {
            if (item) {
              self.homeArticles.push(item);
            }
          }); 
          self.curPage = data.curPage;
          self.isArticleOver = data.over;
          if (finishCallback) {
            finishCallback();
          }
        }, () => {
          if (finishCallback) {
            finishCallback();
          }
          this.$modal.toast('请求失败');
        });
      },
      requestBanners() {
        const self = this;
        self.requestWanAndroid({
          url: self.apiBanner,
        }, (data) => {
          self.homeBanners = data;
        }, () => {
          this.$modal.toast('请求失败');
        });
      },
    },
  };
</script>

