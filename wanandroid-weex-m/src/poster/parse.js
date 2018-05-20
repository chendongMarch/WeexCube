const data = {
  hot: false,
};
data.contentType = 'web';
data.content = window.location.href;

if (data.indexOf('weixin') !== -1) {
  data.from = document.getElementById('profileBt').getElementsByTagName('a')[0].innerHTML.trim();
  data.title = document.getElementById('activity-name').getElementsByTagName('script')[0].innerHTML.trim().match(/document.write\("(.*)"\);/g)[1].replace('document.write("', '').replace('");', '');
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const node = images[i];
    const w = node.clientWidth;
    const h = node.clientHeight;
    const src = node.getAttribute('src');
    console.log(`${w} ${h} ${src.indexOf('http') === 0} ${src.indexOf('http') === 0 && (w > 300 || h > 300)}`);
    if (src.indexOf('http') === 0 && (w > 300 || h > 300)) {
      data.cover = src;
      break;
    }
  }
  channelMap = {
    funny: ['内涵段子', '乐呵每一天', '冷兔', '笑点'],
    report: ['日报', '知乎', '新华社'],
    girls: ['草莓', '街拍', '妹子', 'meizi'],
    elegant: ['那一座城'],
  };
  channelMap['it-report'] = ['juejin', '掘金', '36氪', 'google', '谷歌', 'android', '安卓', 'FE'];
  for (const key in channelMap) {
    const array = channelMap[key];
    let isBreak = false;
    for (let i = 0; i < array.length; i++) {
      if (data.from.toLowerCase().indexOf(array[i]) !== -1) {
        data.channel = key;
        console.log(`${data.from} ${key}`);
        isBreak = true;
        break;
      }
    }
    if (isBreak) { break; }
  }
}
if (!data.cover || !data.content || !data.title || !data.from) {
  console.log('解析失败');
}
console.log(JSON.stringify(data));
