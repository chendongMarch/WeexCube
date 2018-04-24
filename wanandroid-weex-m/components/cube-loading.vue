<template>
  <loading class="loading-wrap" display="show">
    <text class="loading-text">loading...</text>
    <loading-indicator class="loading-indicator"></loading-indicator>
  </loading>
</template>

<style scoped>
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
module.exports = {
  name: 'cube-loading',
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
};
</script>

