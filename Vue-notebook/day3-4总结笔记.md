# day3-4总结笔记

> [!IMPORTANT]
>
> ##### 需要注意以下知识点：

###### 1、懒加载 (useLazyLoad)

（1）视口定义：用户当前可见的屏幕区域；
（2）useIntersectionObserver监听元素是否进入视口；
（3）进入视口时isShow = true，触发图片加载；
（4）stop()停止监听（加载一次就够了）。

###### 2、路由缓存问题（重要！）

（1）问题：eg./category/1 → /category/2时，组件被复用,mounted不执行；
解决：用onBeforeRouteUpdate监听路由变化；
（2）在回调中手动调用init()+fetchData()刷新数据。

###### 3、无限滚动

（1）v-infinite-scroll指令：滚动到底部自动触发；
（2）eg.infinite-scroll-distance="10"：距离底部10px时触发；
（3）需要配合loading（防重复）和 finished（判断是否还有数据）。

###### 4、watch 侦听器

（1）监听筛选条件变化：watch(currentFilter, () => {...})
（2）变化后重置列表并重新请求数据