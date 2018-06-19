<template>
  <div>
    <cube-header
     :leftStyle="{fontSize:40+'px'}"
     leftTitle=" 👈 "
     centerTitle="Me"></cube-header>
    <list class="content-wrap">
      <cell>
        <div class="msgs-wrap" v-for="(item,index) in msgs" :key="index" :style="{marginTop:index ===0?40:0+'px'}"
        @click="clickMsgItem(item)">
          <image class="msgs-image" 
            resize="cover"
            :src="item.cover"></image>
          <div class="text-wrap">
            <text class="msgs-title">{{item.title}}</text>
            <text v-if="item.desc" class="msgs-desc">{{item.desc}}</text>
          </div>
        </div>
      </cell>
    </list>
  </div>
</template>

<style>
.content-wrap {
  background-color: #eee;
}
.msgs-slider {
  height: 400px;
  width: 750px;
  justify-content: center;
  align-items: center;
}
.msgs-wrap {
  height: 350px;
  width: 670px;
  margin-left: 40px;
  margin-bottom: 40px;
}
.msgs-image {
 height: 350px;
 width: 750px;
}
.text-wrap {
  position: absolute;
  bottom: 0;
  width: 750px;
  background-color: #000;
  opacity: .7;
  justify-content: center;
  padding: 30px;
}
.msgs-title {
  font-size: 36px;
  color: white;
  width: 690px;
  font-weight: bold;
}
.msgs-desc {
  margin-top: 10px;
  font-size: 28px;
  color: white;
  width: 610px;
}
</style>


<script>
import './widget';
import Header from '../components/cube-header';

export default {
  components: {
    'cube-header': Header,
  },
  data() {
    return {
      msgs: [
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-1/44700615.jpg',
          title: '我的个人博客，基于 Hexo+NexT',
          desc: '确定不来看看？',
          url: 'http://cdevlab.top/',
        },
        {
          cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526809107415&di=ffed6d460d3b67f5e8db62d2a6df3841&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1613003797%2C2892789947%26fm%3D214%26gp%3D0.jpg',
          title: '我的 GitHub',
          desc: '求 star，✨✨✨✨✨✨✨✨✨✨',
          url: 'https://github.com/chendongMarch',
        },
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-6/30515419.jpg',
          title: 'SocialSdk 三方登录分享原生接入',
          desc: '提供 微博、微信、QQ 的登陆分享功能原生SDK的一键接入支持。',
          url: 'http://cdevlab.top/article/3067853428/',
        },
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-6/27323356.jpg',
          title: 'LightAdapter 轻量级适配器',
          desc: '为 RecyclerView 的数据加载更新提供更轻量级的解决方案。',
          url: 'http://cdevlab.top/article/1632666977/',
        },
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-5-20/24405693.jpg',
          title: 'ImageEditor (图片处理)',
          desc: '参照 in、美图秀秀，实现图片处理，裁剪旋转，贴纸涂鸦，滤镜等...',
          url: 'https://github.com/chendongMarch/ImageEditor',
        },
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-4-23/47179516.jpg',
          title: 'WeexCube (Weex 容器方案)',
          desc: '轻量级 Weex 容器，缓存、环境、数据优化处理，迭代中...',
          url: 'https://github.com/chendongMarch/Weex-Cube',
        },
        {
          cover: 'http://olx4t2q6z.bkt.clouddn.com/18-2-6/66080848.jpg',
          title: 'Kotlin 学习系列总结',
          desc: '共计 22 篇，主要涉及官方文档的基本语法及 Anko 的使用等。',
          url: 'http://cdevlab.top/article/bbab636a/',
        },
      ],
    };
  },
  methods: {
    clickMsgItem(item) {
      this.$router.openWeb(item.url);
    },
  },
};
</script>
