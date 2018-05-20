<template>
  <loading 
      v-if="!disabled"
      class="loading-wrap" 
      :display="makeStatus().display" 
      @loading="onLoading">
      <text class="loading-text">{{makeStatus().loadingMsg}}</text>
      <loading-indicator class="loading-indicator"></loading-indicator>
    </loading>
</template>

<style>
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
const debug = weex.requireModule('cube-debug');
const modal = weex.requireModule('cube-modal');

export default {
  props: {
    loadingHandler: {
      default: () => {},
      type: Function,
    },
    status: {
      default: 'before',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onLoading() {
      const self = this;
      if (self.disabled) {
        modal.toast('没有更多数据');
        return;
      }
      this.loadingHandler();
    },
    makeStatus() {
      const self = this;
      let loadingStatus = {};
      switch (self.status) {
        case 'before':
          loadingStatus = {
            display: 'show',
            loadingMsg: '上拉加载数据...',
          };
          break;
        case 'doing':
          loadingStatus = {
            display: 'show',
            loadingMsg: '请稍候...',
          };
          break;
        case 'after':
          loadingStatus = {
            display: 'hide',
            loadingMsg: '上拉加载数据...',
          };
          break;
        default:
          loadingStatus = {
            display: 'show',
            loadingMsg: '上拉加载数据...',
          };
          break;
      }
      return loadingStatus;
    },
  },
};
</script>
