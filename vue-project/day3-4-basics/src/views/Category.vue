<template>
  <div>
    <!-- 插值语法：显示当前分类名称，比如"手机"或"电脑" -->
    <h2>当前分类: {{ categoryName }}</h2>

    <!-- 筛选按钮组 -->
    <div class="filters">
      <!-- v-for 循环渲染三个筛选按钮 -->
      <!-- :class 动态绑定样式：当前选中的按钮有 active 类 -->
      <!-- @click 点击时改变 currentFilter 的值 -->
      <button
        v-for="filter in filters"
        :key="filter.value"
        :class="{ active: currentFilter === filter.value }"
        @click="currentFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- 无限滚动：当滚动到底部时自动加载下一页 -->
    <!-- v-infinite-scroll 是 ElementPlus 提供的指令 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10">
      <!-- v-for 渲染商品列表 -->
      <div v-for="item in list" :key="item.id" class="item">
        {{ item.name }}
      </div>
      <!-- 加载状态提示 -->
      <div v-if="loading">加载中...</div>
      <div v-if="finished">没有更多了</div>
    </div>
  </div>
</template>

<script setup>
// 导入 Vue 核心 API
import { ref, watch, onBeforeRouteUpdate } from "vue";
// onBeforeRouteUpdate 是关键！它解决"路由缓存"问题
// 问题：当从 /category/1 切换到 /category/2 时，Vue 会复用同一个组件实例
// 导致组件不会重新创建，mounted 不会再次执行
// 解决方案：用 onBeforeRouteUpdate 监听路由变化，手动刷新数据

import { useRoute } from "vue-router"; // 获取当前路由信息

const route = useRoute(); // route.params.id 可以拿到分类ID

// ========== 响应式数据定义 ==========
const categoryName = ref(""); // 分类名称，如"手机"
const list = ref([]); // 商品列表数据
const currentFilter = ref("default"); // 当前筛选项：default/sales/price
const page = ref(1); // 当前页码
const loading = ref(false); // 是否正在加载
const finished = ref(false); // 是否已加载完所有数据

// 筛选按钮配置
const filters = [
  { label: "默认", value: "default" },
  { label: "销量", value: "sales" },
  { label: "价格", value: "price" },
];

// ========== 核心：解决路由缓存问题 ==========
// 当路由参数变化但组件被复用时，这个钩子会被调用
// 比如：/category/1 -> /category/2
onBeforeRouteUpdate(async (to, from) => {
  // to: 目标路由，from: 来源路由
  // 重新初始化状态
  init();
  // 重新获取新分类的数据
  await fetchData();
});

// ========== 初始化函数 ==========
// 重置所有状态，准备加载新数据
function init() {
  page.value = 1; // 重置为第一页
  list.value = []; // 清空列表
  finished.value = false; // 重置"加载完成"标志
  // 从路由参数中获取分类ID，这里简化了，实际可能需要根据ID查名称
  categoryName.value = route.params.id;
}

// ========== 获取数据 ==========
async function fetchData() {
  // 防止重复加载：正在加载中 或 已加载完，就不再请求
  if (loading.value || finished.value) return;

  loading.value = true; // 开始加载，显示"加载中..."
  try {
    // 模拟 API 请求（实际项目中会调用真实接口）
    // getCategoryData 会发送 axios 请求
    const res = await getCategoryData({
      categoryId: route.params.id, // 分类ID
      filter: currentFilter.value, // 筛选条件
      page: page.value, // 页码
    });
    // 将新数据追加到列表末尾（注意是 push，不是赋值）
    list.value.push(...res.items);
    // 判断是否还有下一页：如果返回的数据少于10条，说明没有了
    finished.value = res.items.length < 10;
    page.value++; // 页码+1，下次加载下一页
  } finally {
    loading.value = false; // 加载结束，隐藏"加载中..."
  }
}

// ========== 无限滚动触发函数 ==========
// 当滚动到底部时，v-infinite-scroll 指令会调用这个函数
function loadMore() {
  if (!finished.value) fetchData(); // 没加载完就继续加载
}

// ========== 监听筛选条件变化 ==========
// 当用户点击"销量"或"价格"按钮时，currentFilter 改变
// watch 监听到变化后，重置列表并重新加载
watch(currentFilter, () => {
  init(); // 重置状态
  fetchData(); // 用新筛选条件重新加载
});

// ========== 首次加载 ==========
init();
fetchData();
</script>
