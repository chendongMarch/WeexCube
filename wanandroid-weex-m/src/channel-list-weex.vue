<template>
  <div class="content-wrap">
    <cube-header 
    :leftStyle="{fontSize:40+'px'}"
    leftTitle=" 👈 "
    :centerTitle="title"></cube-header>

    <div class="holder-wrap" v-if="articles.length === 0">
      <image src="http://img.zcool.cn/community/0195f55972f18ca8012193a342310a.gif" class="holder-img"></image>
    </div> 
    <list>
      <cube-refresh
      :status="refreshStatus"
      :refreshHandler="refreshHandler"
      ></cube-refresh>
      <cell class="cell-wrap" v-for="(item,index) in articles" :key="index" @click="clickArticle(item)">
        <div class="item-wrap">
           <image class="item-image" resize="cover" :src="item.cover"></image>
           <div>
             <text class="item-text">{{item.title}}</text>
             <text class="item-desc">{{item.createdAt.substr(0,item.createdAt.indexOf(' '))}}   {{item.from}}</text>
           </div>
        </div>
        <div class="line"></div>
      </cell>
      <cube-loading
      :loadingMsg="loadingMsg"
      :finished="finishedArticleReq"
      :status="loadingStatus"
      :loadingHandler="loadingHandler"
      ></cube-loading>
    </list>
    
  </div>
</template>

<style src="./css/common.css"></style>
<style>
.content-wrap {
  /* background-color: white; */
}
.holder-img {
  width: 300px;
  height: 300px;
}
.holder-wrap {
  width: 750px;
  position: absolute;
  height: 750px;
  top: 200px;
  justify-content: center;
  align-items: center;
}

.cell-wrap {
  /* background-color: #efefef; */
  width: 750px;
}
.item-image {
  /* background-color: white; */
  width: 150px;
  height: 150px;
}
.item-wrap {
  /* background-color: white; */
  width: 750px;
  height: 250px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
}
.item-text {
  margin-left: 20px;
  width: 500px;
  font-size: 33px;
  color: #1a1210;
}
.item-desc {
  margin-top: 20px;
  width: 500px;
  margin-left: 20px;
  font-size: 28px;
  color: #808080;
}
</style>

<script>
import './widget';
import { makeBmobConfig } from './js/common';
import Header from '../components/cube-header';
import Loading from '../components/cube-loading';
import Refresh from '../components/cube-refresh';
import { request } from '../components/mixins/weex-mixins';

export default {
  mixins: [request],
  components: {
    'cube-header': Header,
    'cube-refresh': Refresh,
    'cube-loading': Loading,
  },
  data() {
    return {
      loadingMsg: '',
      articleCount: 0,
      refreshStatus: 'before',
      loadingStatus: 'before',
      channel: weex.config.channel,
      title: weex.config.title,
      finishedArticleReq: false,
      pageOffset: 0,
      pageCount: 10,
      /**
       * "channel": "tech-blog",
        "content": "https://juejin.im/post/5aef1a54f265da0b8a678624?utm_source=gold_browser_extension",
        "contentType": "web",
        "cover": "http://olx4t2q6z.bkt.clouddn.com/18-5-20/30930726.jpg",
        "createdAt": "2018-05-19 23:46:06",
        "from": "掘金",
        "hot": false,
        "title": "MVPArms官方快速组件化方案开源,来自5K star的信赖",
        "updatedAt": "2018-05-20 09:40:04"
       */
      articles: [],
    };
  },
  methods: {
    clickLeft() {
      this.$router.closePage();
    },
    refreshHandler() {
      const self = this;
      self.pageOffset = 0;
      self.articles.splice(0, self.articles.length);
      self.refreshStatus = 'doing';
      self.finishedArticleReq = false;
      self.refreshStatus = 'before';
      self.requestChannels(() => {
        self.refreshStatus = 'after';
      });
    },
    loadingHandler() {
      const self = this;
      self.loadingStatus = 'doing';
      self.requestChannels(() => {
        self.loadingStatus = 'after';
      });
    },
    clickArticle(article) {
      this.$router.openWeb(article.content);
    },
    requestCount() {
      const self = this;
      const config = makeBmobConfig('select count(*) from Article where channel=?', `"${self.channel}"`);
      config.loading = false;
      this.fetch(config)
        .then((resp) => {
          if (resp && resp.count) {
            self.articleCount = resp.count;
          }
        })
        .catch((error) => {
          this.$debug.log(JSON.stringify(error));
        });
    },
    requestChannels(callback) {
      const self = this;
      const config = makeBmobConfig('select * from Article where channel = ? limit ?,? count=0 order by -createdAt', `"${self.channel}", ${self.pageOffset}, ${self.pageCount}`);
      config.loading = false;
      this.fetch(config)
        .then((resp) => {
          if (resp && resp.results) {
            if (resp.results.length < self.pageCount) {
              self.finishedArticleReq = true;
            }
            resp.results.forEach((item) => {
              self.articles.push(item);
            });
            self.loadingMsg = `还有 ${self.articleCount - self.articles.length} 篇文章...`;
            self.pageOffset = self.articles.length;
            if (callback) {
              callback();
            }
          } else if (callback) {
            callback();
          }
        })
        .catch((error) => {
          this.$debug.log(JSON.stringify(error));
        });
    },
  },
  created() {
    this.$page.initPage({
      background: {
        color: '#ffffff',
      },
    });
    this.requestCount();
    setTimeout(() => {
      this.requestChannels();
    }, 500);
  },
};
</script>
