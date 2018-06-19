const data = {
  hot: false,
};
data.contentType = 'web';
data.content = window.location.href;

// from title cover channel

if (data.content.indexOf('weixin') !== -1) {
  data.from = document.getElementById('profileBt').getElementsByTagName('a')[0].innerHTML.trim();
  data.title = document.getElementById('activity-name').getElementsByTagName('script')[0].innerHTML.trim().match(/document.write\("(.*)"\);/g)[1].replace('document.write("', '').replace('");', '');
  const channelMap = {
    funny: ['内涵段子', '乐呵每一天', '冷兔', '笑点', '互撸漫画','扯文艺'],
    report: ['日报', '知乎', '新华社'],
    girls: ['草莓', '街拍', '妹子', 'meizi','姐姐'],
    elegant: ['那一座城'],
  };
  channelMap['it-report'] = ['juejin', '码农', '菜鸟', '掘金', '36氪', 'google', '谷歌', 'android', '安卓', 'FE', '开源'];
  channelMap['tech-blog'] = ['京东', '鸿洋', '掘金','转转'];
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
} else if (data.content.indexOf('juejin') !== -1) {
  data.from = '掘金';
  data.channel = 'tech-blog';
  data.title = document.getElementsByClassName('article-title')[0].innerHTML.trim();
}
const images = document.getElementsByTagName('img');
for (let i = 0; i < images.length; i++) {
  const node = images[i];
  const w = node.clientWidth;
  const h = node.clientHeight;
  const src = node.getAttribute('src');
  if (src && src.indexOf('http') === 0) {
    console.log(`${w} ${h}  ${w > 210 && h > 210} ${src}`);
    if (w > 180 || h > 180) {
      data.cover = src;
      break;
    }
  }
}
if (!data.cover && data.content.indexOf('juejin') !== -1) {
  console.log('掘金使用了默认头像');
  data.cover = 'http://olx4t2q6z.bkt.clouddn.com/18-5-20/54692951.jpg';
}

console.log('\n');
console.log(JSON.stringify(data));
if (!data.cover || !data.content || !data.title || !data.from || !data.channel) {
  console.log('解析失败');
} else {
  prompt('复制', JSON.stringify(data));
}

