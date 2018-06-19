<template>
  <div class="content-wrap center" :style="{height:wxHeight+'px'}">
    <image class="error-image" src="http://olx4t2q6z.bkt.clouddn.com/18-5-31/43227570.jpg"></image>
    <div class="error-text-wrap center">
      <text class="error-text text">加载失败了，再试一下吧</text>
    </div>
  </div>
</template>

<style src="./css/common.css"></style>
<style>
.content-wrap {
  width: 750px;
  height: 1050px;
}
.error-image {
  width: 400px;
  height: 400px;
}
.error-text-wrap {
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 50px;
  border-width: 1.5px;
  border-color: #1a1210;
}
.error-text {
  font-size: 30px;
}
</style>

<script>
import './widget';
import { size } from '../components/mixins/weex-mixins';

export default {
  mixins: [size],
  data() {
    return {
      showError: false,
    };
  },
  methods: {
  },
  created() {
    setTimeout(() => {
      this.showError = true;
    }, 500);
  },
};
</script>
