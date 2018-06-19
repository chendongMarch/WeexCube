// android 特有的接口方法

const Android = Object.create(null);
// 状态栏透明
const translucentStatusBar = 'translucentStatusBar';
// 状态栏文字颜色
const setStatusBarLight = 'setStatusBarLight';
// 状态栏文字颜色
const setStatusBarDark = 'setStatusBarDark';

Android.install = (Vue) => {
  Vue.prototype.$android = {
    translucentStatusBar(params, callback) {
      Vue.callBridge(translucentStatusBar, params, callback);
    },
    setStatusBarLight(params, callback) {
      Vue.callBridge(setStatusBarLight, params, callback);
    },
    setStatusBarDark(params, callback) {
      Vue.callBridge(setStatusBarDark, params, callback);
    },
  };
};
Vue.use(Android);
