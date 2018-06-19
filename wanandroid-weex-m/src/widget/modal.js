// 模态接口

const Modal = Object.create(null);
// 显示 toast
const toast = 'toast';
// loading
const loading = 'loading';

Modal.install = (Vue) => {
  Vue.prototype.$modal = {
    toast(params, callback) {
      if (typeof params === 'string') {
        params = { msg: params };
      }
      Vue.callBridge(toast, params, callback);
    },
    loading(params, callback) {
      if (params.show === undefined) {
        callback({ success: false, msg: 'params.show is undefined' });
        return;
      }
      Vue.callBridge(loading, params, callback);
    },
    showLoading(params, callback) {
      if (!params) {
        params = {};
      }
      if (typeof params === 'string') {
        params = { msg: params };
      }
      params.show = true;
      Vue.callBridge(loading, params, callback);
    },
    hideLoading(params, callback) {
      if (!params) {
        params = {};
      }
      if (typeof params === 'string') {
        params = { msg: params };
      }
      params.show = false;
      Vue.callBridge(loading, params, callback);
    },
  };
};
Vue.use(Modal);
