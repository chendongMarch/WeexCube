// 调试接口

const Debug = Object.create(null);
// debug 显示 toast
const debugToast = 'debugToast';
// debug 显示 log
const debugLog = 'debugLog';

Debug.install = (Vue) => {
  Vue.prototype.$debug = {
    log(params, callback) {
      if (typeof params === 'string') {
        params = { msg: params };
      }
      Vue.callBridge(debugLog, params, callback);
    },
    toast(params, callback) {
      if (typeof params === 'string') {
        params = { msg: params };
      }
      Vue.callBridge(debugToast, params, callback);
    },
  };
};
Vue.use(Debug);
