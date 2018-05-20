const stream = weex.requireModule('stream');
const modal = weex.requireModule('cube-modal');
const debug = weex.requireModule('cube-debug');

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
            modal.toast('请求失败');
          }
          return;
        }
        const wxdata = resp.data;
        if (wxdata.errorCode !== 0) {
          if (failCallback) {
            failCallback(resp);
          } else if (wxdata.errorMsg) {
            modal.toast(wxdata.errorMsg);
          } else {
            modal.toast('请求失败');
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
            modal.toast('请求失败');
          }
          return;
        }
        const wxdata = resp.data;
        debug.log('chendong', JSON.stringify(wxdata));
        if (!wxdata) {
          if (failCallback) {
            failCallback(resp);
          } else if (wxdata.errorMsg) {
            modal.toast(wxdata.errorMsg);
          } else {
            modal.toast('请求失败');
          }
          return;
        }
        successCallback(wxdata);
      });
    },
  },
};
