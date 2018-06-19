<template>
  <div class="header-wrap">
    <image :src="imageRes.bg" resize="cover" class="bg-image"></image>
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
.bg-image {
  position: absolute;
  width: 750px;
  height: 120px;
}
.header-wrap {
  border-bottom: 2px;
  border-bottom-color: #efefef;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  height: 120px;
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
  data() {
    return {
      imageRes: {
        bg: 'http://olx4t2q6z.bkt.clouddn.com/18-6-6/5205876.jpg',
      },
    };
  },
  methods: {
    clickLeftBtn() {
      if (this.leftClick) {
        this.leftClick();
        return;
      }
      if (this.leftTitle) {
        this.$router.closePage();
      }
    },
  },
};
</script>
