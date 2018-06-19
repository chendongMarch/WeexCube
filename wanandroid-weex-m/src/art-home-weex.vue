<template>
  <div class="content-wrap">
    <cube-header centerTitle="Yo!"></cube-header>
    <waterfall column-count="2" column-width="100" column-gap="0" class="waterfall-list">
      <header v-if="homeBanners.length !== 0"> 
        <slider 
        class="slider-wrap" 
        interval="5000" 
        scrollable="true"
        infinite="true"
        show-indicators="true"
        auto-play="true">
        <div class="slider-item" v-for="(item, index) in homeBanners" :key="index"
        @click="clickHomeBanner(item)">
          <image class="slider-img" resize="cover" :src="item.cover"></image>
          <text class="slider-text">{{item.title}}</text>
        </div>
      </slider>
      </header>
      <cell class="cell-wrap" v-for="(item,index) in channels" :key="index">
        <div class="item-wrap" @click="clickChannel(item)">
          <image class="cover-image" resize="cover" :src="item.cover"></image>
          <div class="text-wrap">
            <text class="title-text">{{item.title}}</text>
          </div>
        </div>
      </cell>
    </waterfall>
  </div>
</template>

<style src="./css/common.css"></style> 
<style>
.cell-wrap {
  height: 450px;
  justify-content: center;
  align-items: center;
}
.item-wrap {
  width: 320px;
  height: 410px;
}
.cover-image {
  width: 320px;
  height: 320px;
}
.text-wrap {
  background-color: white;
  height: 90px;
  justify-content: center;
  align-items: center;
}
.title-text {
  font-size: 30px;
  color: #1a1210;
}
.slider-wrap {
  width: 750px;
  height: 400px;
}
.slider-item {
  width: 750px;
  height: 400px;
}
.slider-img {
  width: 750px;
  height: 400px;
}
.slider-text {
  width: 750px;
  position: absolute;
  bottom: 0;
  opacity: .7;
  font-size: 30px;
  color: #fff;
  background-color: black;
  padding: 30px;
}
</style>
<style src="./css/common.css"></style>

<script>
import './widget';
import { makeBmobConfig } from './js/common';
import Header from '../components/cube-header';
import { request } from '../components/mixins/weex-mixins';

export default {
  mixins: [request],
  components: {
    'cube-header': Header,
  },
  data() {
    return {
      lastPressedTime: -1,
      homeBanners: [],
      channels: [
        {
          title: '博文推荐',
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-3/61219199.jpg',
          channel: 'tech-blog',
        },
        {
          title: 'IT报',
          // cover: 'http://olx4t2q6z.bkt.clouddn.com/18-5-20/39396525.jpg',
          cover: 'http://cdn1.showjoy.com/images/40/401369905c324758938b185a1100a5a8.png.50x50.webp',
          channel: 'it-report',
        },
        // {
        //   title: '文艺范',
        //   cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526732672848&di=5f05ca415cb2d7f52ddbaa48d9b09574&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa08b87d6277f9e2f034e20261430e924b899f3a0.jpg',
        //   channel: 'elegant',
        // },
        {
          title: '一手新鲜',
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-5-19/60635143.jpg',
          channel: 'report',
        },
        {
          title: '美女美女',
          cover: 'http://mm.chinasareview.com/wp-content/uploads/2017a/08/01/01.jpg',
          channel: 'girls',
        },
        {
          title: '不负好时光',
          cover: 'https://tva1.sinaimg.cn/crop.0.0.711.400/90eb2137ly1fkydecgqkaj20jr0b440a.jpg',
          channel: 'funny',
        },
        {
          title: '狗窝',
          cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526731409805&di=f31ae7f2ea75b73c71355d3a063b13ce&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F77c6a7efce1b9d164e807e8ff9deb48f8d54649d.jpg',
          link: '/my/my-house-weex',
          resize: 'contain',
        },
        {
          title: '玩～Android',
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-1/42862847.jpg',
          resize: 'contain',
          link: '/wanandroid/wanandroid-index-weex',
        },
      ],
    };
  },
  methods: {
    clickHomeBanner(item) {
      // this.$router.openWeb(item.content);
      this.$router.openNative('com.march.debug.DebugActivity');
    },
    clickChannel(item) {
      if (item.channel) {
        this.$router.openUrl({
          url: '/channel/channel-list-weex',
          query: {
            channel: item.channel,
            title: item.title,
          },
        });
      } else if (item.link) {
        this.$router.openUrl(item.link);
      }
    },
    requestChannels() {
      const self = this;
      const config = makeBmobConfig('select * from Article where hot = ? limit ?,? count=0 order by -createdAt', 'true, 0, 5');
      this.fetch(config)
        .then((resp) => {
          if (resp && resp.results) {
            resp.results.forEach((item) => {
              self.homeBanners.push(item);
            });
          }
        })
        .catch((error) => {
          this.$debug(JSON.stringify(error));
        });
    },
  },
  created() {
    this.requestChannels();
    this.$page.initPage({
      background: {
        // color: '#efefef', // 纯色背景
        image: 'http://cdn1.showjoy.com/images/df/dffde01d02634f08a0f0dbcbe6b6ee51.jpg', // 图片背景
        repeat: true, // 开启平铺
        widthScale: 0.5, // 平铺时，宽度占总宽度比例
        acpectRatio: 1, // 平铺时，宽高比例
      },
      back: true });
    this.$event.registerNativeEvent('resume', () => {
    });
    this.$event.registerNativeEvent('onBackPressed', () => {
      const now = new Date().getTime();
      if (now - this.lastPressedTime < 1500) {
        this.$router.closePage();
      } else {
        this.$modal.toast('再按一次退出');
        this.lastPressedTime = now;
      }
    });
  },
};
</script>

