
const cubeBasic = weex.requireModule('cube-basic');

export default {
  methods: {
    openUrl(url, params) {
      if (params) {
        cubeBasic.putExtraData(url, params);
      }
      cubeBasic.openUrl(url);
    },
    openDialog(url, config, params) {
      if (params) {
        cubeBasic.putExtraData(url, params);
      }
      cubeBasic.openDialog(url, config);
    },
    openWeb(url) {
      cubeBasic.openWeb(url);
    },
  },
};
