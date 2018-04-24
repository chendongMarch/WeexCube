<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <text class="title-text">请选择分类</text>
    </div>
    <scroller>  
      <div class="level-warp">
        <div v-for="(item, index) in categoryList" :key="index" @click="clickOneLevel(item)">
          <text class="level-parent">{{item.name}}</text>
        </div>
      </div>
       <div class="line"></div>
       <div class="level-warp">
        <div v-for="(item, index) in levelTwoCategory" :key="index" @click="clickTwoLevel(item)">
          <text class="level-parent">{{item.name}}</text>
        </div> 
      </div>
    </scroller>
  </div>
</template>

<style scoped>
.title-wrap {
  height: 100px;
  justify-content: center;
  align-items: center;
}
.title-text {
  color: #1a1210;
  font-size: 30px;
}
.line {
  height: 2px;
  background-color: #efefef;
}
.content-wrap {
  height: 1000px;
}
.level-warp {
  padding: 10px;
  flex-wrap: wrap;
  flex-direction: row;
}
.level-parent {
  margin: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 28px;
  color: #1a1210;
  border-width: 2px;
  border-color: gray;
  border-style: solid;
  border-radius: 20px;
}
</style>

<script>
import { request } from '../components/mixins/weex-mixins';

const debug = weex.requireModule('cube-debug');
const cubeEvent = weex.requireModule('cube-event');
const cubeBasic = weex.requireModule('cube-basic');

export default {
  minxins: [request],
  data() {
    return {
      categoryList: weex.config.extraData.data,
      levelTwoCategory: [],
    };
  },
  methods: {
    clickOneLevel(category) {
      this.levelTwoCategory = category.children;
    },
    clickTwoLevel(twoLevelCategory) {
      cubeBasic.close();
      cubeEvent.postEvent('choose-category', { cid: twoLevelCategory.id });
    },
  },
  created() {
    this.levelTwoCategory = this.categoryList[0].children;
  },
};
</script>
