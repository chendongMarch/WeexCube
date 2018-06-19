<template>
  <refresh  v-if="!finished" class="loading-wrap" :display="makeStatus().display" @refresh="onRefresh">
    <text class="loading-text">{{makeStatus().refreshMsg}}</text>
    <loading-indicator class="loading-indicator"></loading-indicator>
  </refresh>
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

export default {
  props: {
    refreshHandler: {
      default: () => {},
      type: Function,
    },
    status: {
      default: 'before',
      type: String,
    },
    finished: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onRefresh() {
      const self = this;
      if (self.finished) {
        return;
      }
      self.refreshHandler();
    },
    makeStatus() {
      const self = this;
      let loadingStatus = {};
      switch (self.status) {
        case 'before':
          loadingStatus = {
            display: 'show',
            refreshMsg: '刷新数据...',
          };
          break;
        case 'doing':
          loadingStatus = {
            display: 'show',
            refreshMsg: '请稍候...',
          };
          break;
        case 'after':
          loadingStatus = {
            display: 'hide',
            refreshMsg: '刷新数据...',
          };
          break;
        default:
          loadingStatus = {
            display: 'show',
            refreshMsg: '刷新数据...',
          };
          break;
      }
      return loadingStatus;
    },
  },
};
</script>
