
const stream = weex.requireModule('stream');

export default {
  methods: {
    requestWanAndroid(config, successCallback, failCallback) {
      config.method = config.method || 'GET';
      config.type = config.type || 'json';
      stream.fetch(config, (resp) => {
        if (resp.status !== 200) {
          if (failCallback) {
            failCallback(resp);
          } else {
            this.$modal.toast('请求失败');
          }
          return;
        }
        const wxdata = resp.data;
        if (wxdata.errorCode !== 0) {
          if (failCallback) {
            failCallback(resp);
          } else if (wxdata.errorMsg) {
            this.$modal.toast(wxdata.errorMsg);
          } else {
            this.$modal.toast('请求失败');
          }
          return;
        }
        successCallback(wxdata.data);
      });
    },
    request(config, successCallback, failCallback) {
      config.method = config.method || 'GET';
      config.type = config.type || 'json';
      stream.fetch(config, (resp) => {
        if (resp.status !== 200) {
          if (failCallback) {
            failCallback(resp);
          } else {
            this.$modal.toast('请求失败');
          }
          return;
        }
        const wxdata = resp.data;

        if (!wxdata) {
          if (failCallback) {
            failCallback(resp);
          } else if (wxdata.errorMsg) {
            this.$modal.toast(wxdata.errorMsg);
          } else {
            this.$modal.toast('请求失败');
          }
          return;
        }
        successCallback(wxdata);
      });
    },
    // 检查参数，准备 promise
    fetch(originConfig) {
      return new Promise((resolve, reject) => {
        this.handleRequest(originConfig, resolve, reject);
      });
    },
    // 对象转请求参数
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
    // 拼接 url
    joinUrl(url, data) {
      if (!data) {
        return url;
      }
      const path = this.obj2Querys(data);
      const sign = url.indexOf('?') === -1 ? '?' : '&';
      return `${url}${sign}${path}`;
    },
    // 准备参数
    prepareConfig(config) {
      const {
        method = 'GET',
        type = 'json',
        headers = config.headers || { },
      } = config;
      const getMethod = method.toLowerCase() === 'get';
      let url = '';
      let body = '';
      if (getMethod) {
        url = this.joinUrl(config.url, config.data);
        body = '';
      } else {
        url = config.url;
        body = this.obj2Querys(config.data);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }
      if (!method || !url || !type) {
        return undefined;
      }
      return { method, url, type, headers, body };
    },
    // 发起请求
    handleRequest(originConfig, resolve, reject) {
      const config = this.prepareConfig(originConfig);
      const {
        loading = true,
        convert = true,
      } = originConfig;
      if (!config) {
        reject(new Error('config not ok!'));
        return;
      }
      if (loading) {
        this.$modal.showLoading();
      }
      stream.fetch(config, (response) => {
        this.$modal.hideLoading();
        if (response.ok) {
          let respContent = response.data;
          if (convert && respContent && typeof respContent === 'string') {
            respContent = JSON.parse(response.data);
          }
          return resolve && resolve(respContent);
        } else if (reject) {
          return reject && reject(response);
        } else if (response.status < 0) {
          // 网络状况不佳
          this.$modal.toast('当前网络不可用，请检查网络设置后重试~');
        } else {
          this.$modal.toast('服务器开小差啦 请稍后尝试~');
        }
        return null;
      }, () => {
        this.$modal.hideLoading();
      });
    },
  },
};
