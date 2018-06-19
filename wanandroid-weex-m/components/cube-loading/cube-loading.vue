<template>
  <loading 
      class="loading-wrap" 
      :display="loadingStatus.display" 
      @loading="onLoading">
      <text  class="loading-text">{{loadingStatus.loadingMsg}}</text>
      <loading-indicator  class="loading-indicator"></loading-indicator>
    </loading>
</template>

<style>
.loading-wrap {
  height:0px;
  width: 750px;
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
    loadingMsg: {
      default: '',
      type: String,
    },
    loadingHandler: {
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
      loadingStatus: {
        display: 'show',
        loadingMsg: '上拉加载数据...',
      },
    };
  },
  watch: {
    status() {
      this.makeStatus();
    },
  },
  methods: {
    onLoading() {
      const self = this;
      self.status = 'doing';
      if (self.finished) {
        self.loadingStatus.loadingMsg = '没有更多数据';
        setTimeout(() => {
          this.$modal.toast('没有更多数据');
          self.status = 'after';
        }, 300);
        return;
      }
      this.loadingHandler();
    },
    makeStatus() {
      const self = this;
      switch (self.status) {
        case 'before':
          self.loadingStatus.display = 'show';
          self.loadingStatus.loadingMsg = self.loadingMsg || '上拉加载数据...';
          break;
        case 'doing':
          self.loadingStatus.display = 'show';
          self.loadingStatus.loadingMsg = '请稍候...';
          break;
        case 'after':
          self.loadingStatus.display = 'hide';
          self.loadingStatus.loadingMsg = '上拉加载数据...';
          break;
        default:
          self.loadingStatus.display = 'show';
          self.loadingStatus.loadingMsg = '上拉加载数据...';
          break;
      }
    },
  },
};
</script>
