<template>
  <div class="article-wrap" @click="clickItem">
    <text class="article-title">{{data.title}}</text>
    <div class="article-desc-wrap">
      <text v-if="data.fresh" class="article-tag">新</text>
      <text class="article-tag">{{genaratePlatformTag(data.link)}}</text>
      <text class="article-desc-key">作者：</text>
      <text class="article-desc-value">{{data.author}}</text>
      <text class="article-desc-key">时间：</text>
      <text class="article-desc-value">{{data.niceDate}}</text>
    </div>
    <div class="article-desc-wrap">
      <text class="article-desc-key">分类：</text>
      <text class="article-desc-value">{{data.chapterName}} / {{data.superChapterName}}</text>
    </div>
  </div>
</template>

<style scoped>
.article-wrap {
  border-bottom: 2px;
  border-bottom-color: #efefef;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;

  padding-left: 30px;
  height: 200px;
  width: 750px;
  justify-content: center;
  align-items: flex-start;
}
.article-title {
  color: #1a1210;
  font-size: 34px;
  font-weight: bold;
  lines:1;
  text-overflow: ellipsis;
}
.article-desc-wrap {
  padding-top: 30px;
  align-items: center;
  flex-direction: row;
}
.article-tag {
  padding: 2px;
  border-width: 2px;
  border-color: #f93450;
  border-style: solid;
  font-size: 22px;
  margin-right: 20px;
}
.article-desc-key {
  color: #928787;
  font-size: 26px;
}
.article-desc-value {
  color: #1a1210;
  margin-right: 20px;
  font-size: 26px;
}
</style>

<script>
const cubeBasic = weex.requireModule('cube-basic');

module.exports = {
  name: 'cube-article',
  data() {
    return {
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    clickItem() {
      cubeBasic.openWeb(this.data.link);
    },
    genaratePlatformTag(link) {
      const lowerLink = link.toLowerCase();
      if (lowerLink.indexOf('jianshu') !== -1) {
        return '简书';
      } else if (lowerLink.indexOf('csdn') !== -1) {
        return 'CSDN';
      } else if (lowerLink.indexOf('juejin') !== -1) {
        return '掘金';
      } else if (lowerLink.indexOf('weixin') !== -1) {
        return '微信';
      } else if (lowerLink.indexOf('cnblogs') !== -1) {
        return '博客园';
      } else if (lowerLink.indexOf('wanandroid') !== -1) {
        return 'WanAndroid';
      } else if (lowerLink.indexOf('meituan') !== -1) {
        return '美团';
      } else if (lowerLink.indexOf('51cto') !== -1) {
        return '51CTO';
      }
      return '博客';
    },
  },
}
</script>
