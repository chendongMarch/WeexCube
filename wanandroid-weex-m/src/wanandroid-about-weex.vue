<template>
  <div class="content-wrap">
    <image :src="icon" class="icon-img"></image>
    <text class="app-title"> WanAndroid 客户端 (Weex)</text>
    <div class="center-block"></div>
    <div class="item-wrap" v-for="(item, index) in items" :key="index"
    @click="clickItem(item)" >
      <text class="item-title">{{item.title}}</text>
    </div>
    <div class="bottom-block"></div>
  </div>
</template>

<style scoped>
.content-wrap {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-img {
  width: 200px;
  height: 200px;
}
.app-title {
  font-size: 40px;
  margin-top: 50px;
  color: #1a1210;
  font-style: bold;
}
.item-wrap {
  width: 750px;
  padding: 30px;
  justify-content: center;
  border-color: #efefef;
  border-style: solid;
  border-bottom-width: 2px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
}
.item-title {
  width: 750px;
  color: darkslategrey;
  font-size: 30px;
}
.center-block {
  width: 750px;
  height: 50px; 
}
.bottom-block { 
  width: 750px;
  height: 150px;
}
</style>

<script>
  import { size, router } from '../components/mixins/weex-mixins';

  export default {
    mixins: [size, router],
    data() {
      return {
        icon: 'http://olx4t2q6z.bkt.clouddn.com/18-4-7/11323316.jpg',
        items: [
          {
            title: 'GitHub Weex-Cube Weex 容器框架',
            link: 'https://github.com/chendongMarch/Weex-Cube',
          },
          {
            title: 'WanAndroid API 支持',
            link: 'http://www.wanandroid.com/blog/show/2',
          },
          {
            title: '我的个人博客 cdevlab.top',
            link: 'http://cdevlab.top/',
          },
          {
            title: '我的 GitHub',
            link: 'https://github.com/chendongMarch?tab=repositories',
          },
        ],
      };
    },
    methods: {
      clickItem(item) {
        this.openWeb(item.link);
      },
    },
    created() {
    },
  };
</script>

