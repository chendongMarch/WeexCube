// 页面接口

// 页面

const Page = Object.create(null);

// 初始化页面状态 {bgColor}
const initPage = 'initPage';
// 重新 load 页面
const reloadPage = 'reloadPage';
// 加载 tab {tabs}
const loadTabs = 'loadTabs';
// 显示 tab {tag}
const showTab = 'showTab';

Page.install = (Vue) => {
  Vue.prototype.$page = {
    initPage(params, callback) {
      Vue.callBridge(initPage, params || {}, callback || (() => {}));
    },
    reloadPage(params, callback) {
      Vue.callBridge(reloadPage, params || {}, callback || (() => {}));
    },
    loadTabs(params, callback) {
      Vue.callBridge(loadTabs, params || {}, callback || (() => {}));
    },
    showTab(params, callback) {
      if (typeof params === 'string') {
        params = { tag: params };
      }
      Vue.callBridge(showTab, params || {}, callback || (() => {}));
    },
  };
};
Vue.use(Page);
