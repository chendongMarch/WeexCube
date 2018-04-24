const globalEvent = weex.requireModule('globalEvent');
const debug = weex.requireModule('cube-debug');
const cubeEvent = weex.requireModule('cube-event');

export default {
  methods: {
    registerEvent(key, callback) {
      if (!globalEvent) {
        return;
      }
      // 注册监听
      globalEvent.addEventListener(key, (data) => {
        callback(data);
      });
      // 给该页面注册该事件
      cubeEvent.registerEvent(key);
    },
  },
};
