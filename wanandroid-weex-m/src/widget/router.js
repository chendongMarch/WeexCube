// 路由接口

const Router = Object.create(null);
// 存放附加数据 {url,data}
const putExtraData = 'putExtraData';
// 关闭页面/弹窗
const closePage = 'closePage';
// 打开页面 {url}
const openUrl = 'openUrl';
// 打开弹窗，原生支持，H5 不需要
// { url, config )
const openDialog = 'openDialog';
// 打开手机应用/天猫/淘宝/京东等 {url}
const openWeb = 'openWeb';
// 打开浏览器 {url}
const openBrowser = 'openBrowser';
// app 内打开 web 页面  {url}
const openApp = 'openApp';
const openNative = 'openNative';

Router.install = (Vue, opts) => {
  const isWeb = weex.config.env.platform.toLowerCase() === 'web';
  Vue.prototype.$router = {
    // obj 转 a=b&c=d
    obj2Querys(obj) {
      const params = [];
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'string'
            || typeof value === 'boolean'
            || typeof value === 'number') {
          params.push([key, value].join('='));
        }
      });
      return params.join('&');
    },
    // 检测补全参数 extra,query
    checkParams(params, callback) {
      let validParams = params;
      if (typeof params === 'string') {
        validParams = { url: params };
      } else if (typeof params === 'object') {
        validParams = Object.assign({ url: params }, params);
      }
      if (!validParams.url) {
        callback({ success: false, msg: 'url is empty' });
        return undefined;
      }
      // 兼容对象 query
      const query = validParams.query;
      if (query && typeof query === 'object' && Object.keys(query).length > 0) {
        const path = this.obj2Querys(query);
        const sign = validParams.url.indexOf('?') === -1 ? '?' : '&';
        validParams.url = `${validParams.url}${sign}${path}`;
        validParams.query = undefined;
      }
      // 兼容携带 extra 的场景
      if (validParams.extra) {
        this.putExtraData({ url: params.url, data: params.extra });
        validParams.extra = undefined;
      }
      return validParams;
    },
    putExtraData(params, callback) {
      Vue.callBridge(putExtraData, params, callback);
    },
    closePage(params, callback) {
      Vue.callBridge(closePage, params, callback);
    },
    openUrl(params, callback) {
      const validParams = this.checkParams(params, callback);
      if (validParams) {
        Vue.callBridge(openUrl, validParams, callback);
      }
    },
    openDialog(params, callback) {
      const validParams = this.checkParams(params, callback);
      if (validParams) {
        Vue.callBridge(openDialog, params, callback);
      }
    },
    openWeb(params, callback) {
      if (isWeb) {
        this.openUrl(params, callback);
        return;
      }
      const validParams = this.checkParams(params, callback);
      if (validParams) {
        Vue.callBridge(openWeb, params, callback);
      }
    },
    openBrowser(params, callback) {
      if (isWeb) {
        this.openUrl(params, callback);
        return;
      }
      const validParams = this.checkParams(params, callback);
      if (validParams) {
        Vue.callBridge(openBrowser, params, callback);
      }
    },
    openApp(params, callback) {
      if (isWeb) {
        this.openUrl(params, callback);
        return;
      }
      const validParams = this.checkParams(params, callback);
      if (validParams) {
        Vue.callBridge(openApp, params, callback);
      }
    },
    openNative(params, callback) {
      Vue.callBridge(openNative, { url: params }, callback);
    },
  };
};
Vue.use(Router);
