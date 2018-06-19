// 页面间事件交互接口，基于 globalEvent 实现，H5 不支持

const Event = Object.create(null);
// 注册事件
const registerEvent = 'registerEvent';
// 发送事件
const postEvent = 'postEvent';
// 取消注册事件
const unRegisterEvent = 'unRegisterEvent';

Event.install = (Vue) => {
  const globalEvent = weex.requireModule('globalEvent');
  Vue.prototype.$event = {
    registerNativeEvent(event, eventHandler) {
      globalEvent.addEventListener(event, eventHandler);
    },
    registerEvent(params, eventHandler, callback) {
      if (!globalEvent) {
        return;
      }
      if (typeof params === 'string') {
        params = { event: params };
      }
      const event = params.event;
      if (!event || !eventHandler) {
        return;
      }
      // 注册官方事件机制
      globalEvent.addEventListener(event, eventHandler);
      Vue.callBridge(registerEvent, params, callback);
    },
    postEvent(params, callback) {
      if (typeof params === 'string') {
        params.event = params;
      }
      if (!params.data) {
        params.data = {};
      }
      const event = params.event;
      if (!event) {
        return;
      }
      Vue.callBridge(postEvent, params, callback);
    },
    unRegisterEvent(params, callback) {
      if (typeof params === 'string') {
        params = { event: params };
      }
      const event = params.event;
      if (!event) {
        return;
      }
      Vue.callBridge(unRegisterEvent, params, callback);
    },
  };
};
Vue.use(Event);
