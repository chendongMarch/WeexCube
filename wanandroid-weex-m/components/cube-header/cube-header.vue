<template>
  <div class="header-wrap">
    <div class="header-center-wrap" >
      <text class="header-center">{{centerTitle}}</text>
    </div> 
    <div class="header-left-wrap"  @click="clickLeftBtn">
      <text class="header-left" :style="leftStyle">{{leftTitle}}</text>
    </div> 
    <div class="header-right-wrap"  @click="rightClick">
      <text class="header-right" :style="rightStyle">{{rightTitle}}</text>
    </div>  
  </div> 
</template>

<style>
.header-wrap {
  border-bottom: 2px;
  border-bottom-color: #efefef;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  height: 120px;
  background-color: white;
}
.header-center-wrap {
  width: 750px;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 80px;
}
.header-center {
  color: #1a1210;
  font-size: 34px;
}
.header-left-wrap {
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 30px;
  bottom: 0;
  height: 80px;
}
.header-left {
  color: #1a1210;
  font-size: 32px;
}
.header-right-wrap {
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 30px;
  bottom: 0;
  height: 80px;
}
.header-right {
  color: #1a1210;
  font-size: 32px;
}
</style>

<script>
const basic = weex.requireModule('cube-basic');
export default {
  props: {
    centerTitle: {
      default: '',
      type: String,
    },
    leftTitle: {
      default: '',
      type: String,
    },
    rightTitle: {
      default: '',
      type: String,
    },
    leftStyle: {
      default: {},
      type: Object,
    },
    rightStyle: {
      default: {},
      type: Object,
    },
    leftClick: {
      default: undefined,
      type: Function,
    },
    rightClick: {
      default: () => {},
      type: Function,
    },
  },
  methods: {
    clickLeftBtn() {
      if (this.leftClick) {
        this.leftClick();
        return;
      }
      if (this.leftTitle) {
        basic.close();
      }
    },
  },
};
</script>
