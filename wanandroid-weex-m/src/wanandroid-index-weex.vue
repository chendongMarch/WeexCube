<template>
  <div class="content-wrap">
    <div class="header-wrap">
      <div class="header-center-wrap">
        <text class="header-center">{{curTab.title}}</text>
      </div> 
     
      <div class="header-right-wrap" v-if="curTab.tag === 'tree'" @click="clickShowFilter">
        <text class="header-right" >筛选</text>
      </div>  
    </div> 
    <container class="container-wrap" :style="{height: (750*height/width)-216 +'px'}"></container>
    <div class="tab-wrap" :style="{height: 100 +'px'}">
      <div class="tab-item" v-for="(item, index) in tabs" :key="index" @click="clickSwitchTab(item)"> 
        <text class="tab-text" :style="{color:item.selected?'turquoise':'gray'}">{{item.title}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  height: 2px;
  background-color: #efefef;
}
.header-wrap {
  border-bottom: 2px;
  border-bottom-color: #efefef;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  padding-top: 20px;
  height: 120px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.header-center-wrap {
  width: 750px;
  height: 120px;
  justify-content: center;
  align-items: center;
}
.header-center {
  color: #1a1210;
  font-size: 34px;
}
.header-right-wrap {
  position: absolute;
  height: 100px;
  justify-content: center;
  align-items: center;
  right: 30px;
}
.header-right {
  color: #1a1210;
  font-size: 32px;
}
.tab-wrap {
  border-top-width: 2px;
  border-top-color: #efefef;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
  background-color: white;
  width: 750px;
  flex-direction: row;
  justify-content: space-between;
}
.tab-item {
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100px;
}
.tab-text {
  font-size: 28px;
}
</style>

<script>
  import './widget';
  
  export default {
    data() {
      return {
        /**
            "platform": "android",
            "osVersion": "7.0",
            "appVersion": "1.0",
            "weexVersion": "0.17.0",
            "deviceModel": "MI 5s",
            "appName": "com.march.weex",
            "deviceWidth": "1080",
            "deviceHeight": "1920",
            "container": "weex-cube",
            "osName": "android",
            "os": "android",
            "scale": "3.0"
         */
        height: weex.config.env.deviceHeight,
        width: weex.config.env.deviceWidth,
        curTab: null,
        tabs: [{
          tag: 'recommend',
          url: '/wanandroid/wanandroid-recommend-weex',
          title: '推荐',
          lazyLoad: false,
          indexPage: true,
          selected: true,
        }, {
          tag: 'tree',
          url: '/wanandroid/wanandroid-tree-weex',
          title: '体系',
          lazyLoad: false,
          indexPage: false,
          selected: false,
        }, {
          tag: 'about',
          url: '/wanandroid/wanandroid-about-weex',
          title: '关于',
          lazyLoad: false,
          indexPage: false,
          selected: false,
        },
        ],
      };
    },
    methods: {
      clickShowFilter() {
        this.$event.postEvent({
          event: 'open-filter-dialog',
        });
      },
      clickSwitchTab(tab) {
        const self = this;
        self.tabs.forEach((item) => {
          item.selected = false;
        });
        tab.selected = true;
        this.$page.showTab({
          tag: tab.tag,
        });
        this.curTab = tab;
      },
    },
    created() {
      this.curTab = this.tabs[0];
      this.$page.loadTabs({
        tabs: this.tabs,
      });
    },
  };
</script>

