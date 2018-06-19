const moduleName = 'bridge';
const bridge = weex.requireModule(moduleName);

Vue.callBridge = (method, params, callback) => {
  bridge.call(method, params || {}, callback || (() => {}));
};

