<template>
  <list class="content-wrap">
    <cell v-for="(item, index) in treeArticles" :key="index">
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
.line {
  height: 2px;
  background-color: #efefef;
}
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
</style>

<script>
import { request, event, router } from '../components/mixins/weex-mixins';
import Article from '../components/cube-article';

const debug = weex.requireModule('cube-debug');
const basic = weex.requireModule('cube-basic');
const cubeModal = weex.requireModule('cube-modal');

export default {
  components: {
    'cube-article': Article,
  },
  mixins: [request, event, router],
  data() {
    return {
      height: weex.config.env.deviceHeight,
      width: weex.config.env.deviceWidth,
      curPage: 0,
      isArticleOver: false,
      curCid: -1,
      categoryList: [],
      treeArticles: [],
      apiTreeCategory: '/tree/json',
      apiArticles: '/article/list/',
      loadingStatus: {
        display: 'hide',
        loadingMsg: '上拉加载更多...',
      },
    };
  },
  methods: {
    onLoadMore() {
      const self = this;
      self.loadingStatus.display = 'show';
      self.loadingStatus.loadingMsg = '请稍候...';
      this.requestArticles(() => {
        self.loadingStatus.display = 'hide';
        setTimeout(() => {
          self.loadingStatus.loadingMsg = '上拉加载更多...';
        }, 500);
      });
    },
    showCategoryDialog() {
      const self = this;
      if (!self.categoryList || self.categoryList.length === 0) {
        return;
      }
      const config = {
        width: 750,
        tag: 'dialog',
        gravity: 'bottom',
        anim: 'btc',
      };
      const url = '/tree/tree-category-weex';
      self.openDialog(url, config, { data: self.categoryList });
    },
    requestCategory(successCallback) {
      const self = this;
      self.requestWanAndroid({
        url: self.apiTreeCategory,
      }, (data) => {
        self.categoryList = data;
        successCallback();
      });
    },
    requestArticles(finishCallback) {
      const self = this;
      if (self.curCid === -1 || self.isArticleOver) {
        if (finishCallback) {
          finishCallback();
        }
        return;
      }

      self.requestWanAndroid({
        url: `${self.apiArticles}${self.curPage}/json?cid=${self.curCid}`,
      }, (data) => {
        data.datas.forEach((item) => {
          if (item) {
            self.treeArticles.push(item);
          }
        });
        self.curPage = data.curPage;
        self.isArticleOver = data.over;
        if (finishCallback) {
          finishCallback();
        }
      }, () => {
        cubeModal.toast('请求失败');
        if (finishCallback) {
          finishCallback();
        }
      });
    },
  },
  created() {
    const self = this;
    self.requestCategory(() => {
      self.curCid = self.categoryList[0].children[0].id;
      self.requestArticles();
    }); 
    self.registerEvent('choose-category', (data) => {
      self.curCid = data.cid;
      self.curPage = 0;
      self.isArticleOver = false;
      self.treeArticles.splice(0, self.treeArticles.length);
      self.requestArticles();
    }); 
    self.registerEvent('open-filter-dialog', () => {
      self.showCategoryDialog();
    });
  },
};
</script>

