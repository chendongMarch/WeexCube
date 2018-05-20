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
      </cell>
      <cube-loading
      :disabled="finishedArticleReq"
      :status="loadingStatus"
      :loadingHandler="loadingHandler"
      ></cube-loading>
    </list>
    
  </div>
</template>

<style src="./css/common.css"></style>
<style>
.content-wrap {
  background-color: #efefef;
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
.holder-indicator {
  width: 100px;
  height: 100px;
  transform:rotate(180deg);
        transition: all 2s;
}
.cell-wrap {
  width: 750px;
}
.item-image {
  background-color: white;
  width: 150px;
  height: 150px;
}
.item-wrap {
  background-color: white;
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
import { makeBmobConfig } from './js/common';
import Header from '../components/cube-header';
import Loading from '../components/cube-loading';
import Refresh from '../components/cube-refresh';
import { request } from '../components/mixins/weex-mixins';

const basic = weex.requireModule('cube-basic');
const debug = weex.requireModule('cube-debug');
const modal = weex.requireModule('cube-modal');

export default {
  mixins: [request],
  components: {
    'cube-header': Header,
    'cube-refresh': Refresh,
    'cube-loading': Loading,
  },
  data() {
    return {
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
      basic.close();
    },
    refreshHandler() {
      const self = this;
      self.pageOffset = 0;
      self.articles.splice(0, self.articles.length);
      self.refreshStatus = 'doing';
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
      basic.openWeb(article.content);
    },
    requestCount() {
      const self = this;
      const config = makeBmobConfig('select count(*) from Article where channel=?', `"${self.channel}"`);
      this.request(config, (resp) => {
        if (resp && resp.count) {
          self.articleCount = resp.count;
          modal.toast(`共 ${self.articleCount} 篇文章`);
        }
      });
    },
    requestChannels(callback) {
      const self = this;
      const config = makeBmobConfig('select * from Article where channel = ? limit ?,? count=0 order by -createdAt', `"${self.channel}", ${self.pageOffset}, ${self.pageCount}`);
      this.request(config, (resp) => {
        if (resp && resp.results) {
          if (resp.results.length < self.pageCount) {
            // modal.toast('没有更多数据');
            self.finishedArticleReq = true;
          }
          resp.results.forEach((item) => {
            self.articles.push(item);
          });
          self.pageOffset = self.articles.length;
          if (callback) {
            callback();
          }
        } else if (callback) {
          callback();
        }
      });
    },
  },
  created() {
    this.requestCount();
    setTimeout(() => {
      this.requestChannels();
    }, 500);
  },
};
</script>
