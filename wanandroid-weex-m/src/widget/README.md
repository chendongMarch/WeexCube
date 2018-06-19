this.$router
// 直接使用 url 跳转
this.$router.openUrl('http://www.test.com?data=100&test=false');

// 跳转时携带对象数据，使用扩展传递，适合无法使用 url 传递的类型
this.$router.openUrl({
  url: 'http://www.test.com?data=100',
  extra: {
    data: 100,
    test: false,
  },
});

// 跳转时携带 url 参数，内部会拼接到 url 上面，更清晰
this.$router.openUrl({
  url: 'http://www.test.com',
  query: {
    data: 100,
    test: false,
  },
});


this.$event

// 注册事件，并监听
this.$event.registerEvent('choose-data', (data) => {
  // 事件数据
});
// 取消注册事件
this.$event.unRegisterEvent('choose-data');
// 发送事件
this.$event.postEvent('choose-data');
this.$event.postEvent({
  event: 'choose-data',
  data: {
    test: 1,
  },
});
// 接受客户端容器事件
this.$event.registerNativeEvent('resume');