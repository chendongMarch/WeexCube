
export default {
  data() {
    return {
      deviceHeight: weex.config.env.deviceHeight,
      deviceWidth: weex.config.env.deviceWidth,
      wxWidth: 750,
      wxHeight: (750.0 * weex.config.env.deviceHeight) / weex.config.env.deviceWidth,
    };
  },
};
