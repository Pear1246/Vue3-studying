<!-- 功能：我的订单页面 - Tab切换 + 订单列表展示    -->

<template>
  <div class="order-list">
    <!-- ======================================== -->
    <!-- 1、 页面标题                              -->
    <!-- ======================================== -->
    <h2>我的订单</h2>

    <!-- ======================================== -->
    <!-- 2、 Tab 切换栏                            -->
    <!-- 注意点：                                  -->
    <!-- (1)v-for 遍历 tabs 数组，生成多个按钮      -->
    <!-- (2):class 动态绑定：当前选中的 Tab 高亮    -->
    <!-- (3) @click 点击时切换 currentTab 的值       -->
    <!-- ======================================== -->
    <div class="order-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ active: currentTab === tab.value }"
        @click="currentTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ======================================== -->
    <!-- 3. 订单列表（核心显示区域）               -->
    <!-- 注意点：                                  -->
    <!-- (1)v-if="orders.length"：有订单时显示列表  -->
    <!-- (2)v-for 遍历 filteredOrders（筛选后的）  -->
    <!-- (3)v-else：无订单时显示"暂无订单"          -->
    <!-- ======================================== -->
    <div v-if="orders.length" class="order-items">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card">
        <!-- 订单头部：订单号 + 状态 -->
        <div class="order-header">
          <span class="order-no">订单号：{{ order.orderNo }}</span>
          <!-- :class 动态绑定状态样式，不同状态不同颜色 -->
          <span :class="'status-' + order.status">{{ order.statusText }}</span>
        </div>

        <!-- 订单主体：商品信息 -->
        <div class="order-body">
          商品数量：{{ order.goodsCount }}件
          <span class="order-amount">共 {{ order.goodsCount }} 件商品</span>
        </div>

        <!-- 订单底部：金额 + 操作按钮 -->
        <div class="order-footer">
          <span class="price">实付：¥{{ order.amount }}</span>
          <button class="btn-detail" @click="viewOrderDetail(order.id)">
            查看详情
          </button>
        </div>
      </div>
    </div>

    <!-- 空状态：没有订单时显示 -->
    <div v-else class="empty">
      <div class="empty-icon">全部订单</div>
      <p>暂无订单数据</p>
      <p class="empty-tip">去逛逛，买点东西吧~</p>
    </div>
  </div>
</template>

<script setup>
// ================================================
// 学习注意点：
// (1) ref 用于创建响应式数据（基本类型+对象）
// (2) computed 用于计算属性（有缓存，依赖变化才重新计算）
// (3) 组件内的方法可以直接在模板中使用
// ================================================

import { ref, computed } from "vue";

// ================================================
// 1、 Tab 配置数据
// 注意：value 是实际筛选用的值，label 是显示的文字
// ================================================
const tabs = [
  { label: "全部", value: "all" },
  { label: "待付款", value: "unpaid" },
  { label: "已完成", value: "completed" },
];

// 当前选中的 Tab，默认 'all'
const currentTab = ref("all");

// ================================================
// 2、 订单数据（硬编码，模拟后端返回的数据）
// 注意点：
// (1)实际开发中，这些数据应该从 API 获取
// (2)这里为了演示，直接写在组件里
// (3)status 字段对应 Tab 的 value，用于筛选
// ================================================
const orders = ref([
  {
    id: 1,
    orderNo: "202412010001",
    status: "unpaid",
    statusText: "待付款",
    goodsCount: 2,
    amount: 299.0,
    createTime: "2024-12-01 10:30:00",
  },
  {
    id: 2,
    orderNo: "202412010002",
    status: "completed",
    statusText: "已完成",
    goodsCount: 1,
    amount: 89.0,
    createTime: "2024-12-01 14:20:00",
  },
  {
    id: 3,
    orderNo: "202412020001",
    status: "unpaid",
    statusText: "待付款",
    goodsCount: 3,
    amount: 567.0,
    createTime: "2024-12-02 09:15:00",
  },
  {
    id: 4,
    orderNo: "202412030001",
    status: "completed",
    statusText: "已完成",
    goodsCount: 1,
    amount: 128.0,
    createTime: "2024-12-03 16:45:00",
  },
  {
    id: 5,
    orderNo: "202412040001",
    status: "unpaid",
    statusText: "待付款",
    goodsCount: 2,
    amount: 399.0,
    createTime: "2024-12-04 11:00:00",
  },
]);

// ================================================
// 3、 计算属性：根据当前 Tab 筛选订单
// 注意点：
// （1）使用 computed 而不是普通函数，因为数据变化时会自动重新计算
// （2）当 currentTab 变化时，filteredOrders 会自动更新
// （3）模板中直接使用 filteredOrders 即可
// ================================================
const filteredOrders = computed(() => {
  // 如果选中的是"全部"，返回所有订单
  if (currentTab.value === "all") {
    return orders.value;
  }
  // 否则筛选出 status 匹配的订单
  return orders.value.filter((order) => order.status === currentTab.value);
});

// ================================================
// 4、 查看订单详情的方法
// 注意点：
// （4）实际开发中，这里应该跳转到订单详情页
// （5）可以通过 router.push() 进行路由跳转
// ================================================
function viewOrderDetail(orderId) {
  // 实际项目中：
  // router.push(`/order/detail/${orderId}`)
  console.log("查看订单详情，订单ID：", orderId);
  alert(`查看订单 ${orderId} 的详情（演示弹窗）`);
}
</script>

<style scoped>
/* ============================================ */
/* 样式说明：scoped 表示样式只作用于当前组件  */
/* 注意点：                                    */
/* （1）使用 scoped 避免样式污染其他组件          */
/* （2）状态样式（status-xxx）用于不同订单状态   */
/* ============================================ */

.order-list {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
}

/* 页面标题 */
.order-list h2 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* ===== Tab 切换栏样式 ===== */
.order-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.order-tabs button {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s;
}

/* Tab 悬停效果 */
.order-tabs button:hover {
  color: #ff6b6b;
}

/* Tab 激活状态样式 */
.order-tabs button.active {
  color: #ff6b6b;
  border-bottom: 2px solid #ff6b6b;
}

/* ===== 订单卡片样式 ===== */
.order-card {
  border: 1px solid #eee;
  margin-bottom: 12px;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

/* 订单卡片悬停效果 */
.order-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 订单头部 */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.order-no {
  color: #666;
  font-size: 13px;
}

/* ===== 订单状态颜色 ===== */
.status-unpaid {
  color: #ff9800;
  font-weight: 500;
}

.status-completed {
  color: #4caf50;
  font-weight: 500;
}

/* 订单主体 */
.order-body {
  color: #333;
  font-size: 14px;
  margin-bottom: 10px;
}

.order-amount {
  margin-left: 15px;
  color: #999;
}

/* 订单底部 */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.price {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
}

.btn-detail {
  padding: 5px 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.btn-detail:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* ===== 空状态样式 ===== */
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.empty-tip {
  font-size: 12px;
  margin-top: 8px;
  color: #bbb;
}
</style>
