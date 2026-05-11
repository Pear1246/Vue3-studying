<!-- 演示 SKU 规格选择器组件src/views/member/SkuDemo.vue           -->
<!-- 访问路径：/member/sku                        -->
<!-- ============================================ -->

<template>
  <div class="sku-demo">
    <!-- ======================================== -->
    <!-- 1、 页面标题                              -->
    <!-- ======================================== -->
    <h2>SKU 规格选择器演示</h2>
    <p class="desc">点击规格选项，体验 SKU 联动效果</p>

    <!-- ======================================== -->
    <!-- 2、 SKU 组件                              -->
    <!-- 注意点：                                  -->
    <!-- (1) :specs 传入规格数据                    -->
    <!-- (2) :skuList 传入 SKU 数据                 -->
    <!-- (3) @change 监听选中变化                   -->
    <!-- ======================================== -->
    <div class="demo-card">
      <h3>商品：测试手机</h3>
      <Sku :specs="specs" :skuList="skuList" @change="handleSkuChange" />
    </div>

    <!-- ======================================== -->
    <!-- 3、 选中结果展示（调试用）                 -->
    <!-- 注意点：用于观察组件 emit 出来的数据     -->
    <!-- ======================================== -->
    <div class="result-card">
      <h3>选中结果</h3>
      <p>选中的规格：{{ JSON.stringify(selectedSpecs) }}</p>
      <p v-if="selectedSku">
        SKU信息：价格 ¥{{ selectedSku.price }}，库存
        {{ selectedSku.stock }}件，ID: {{ selectedSku.id }}
      </p>
      <p v-else class="tip">请选择完整规格</p>
    </div>
  </div>
</template>

<script setup>
// ================================================
// 学习注意点：
// 1、 这是一个演示页面，展示如何使用 SKU 组件
// 2、 SKU 组件接收 specs 和 skuList 两个 props
// 3、 通过 @change 事件获取用户选中的结果
// ================================================

import { ref } from "vue";
import Sku from "@/components/Sku/index.vue";

// ================================================
// 1、 规格数据
// 注意点：
// (1) name：规格名称（如"颜色"、"尺寸"）
// (2) values：规格值数组
// (3) 每个规格值可以包含 name（显示名）和 img（图片，可选）
// ================================================
const specs = [
  {
    name: "颜色",
    values: [{ name: "黑色" }, { name: "白色" }, { name: "金色" }],
  },
  {
    name: "存储",
    values: [{ name: "128GB" }, { name: "256GB" }, { name: "512GB" }],
  },
];

// ================================================
// 2、 SKU 数据（有效组合）
// 注意点：
// (1) specs 数组：每个规格选中的值，顺序要与 specs 定义一致
// (2) id：SKU 唯一标识
// (3) price：价格
// (4) stock：库存（库存为0的选项应该置灰）
// ================================================
const skuList = [
  // 黑色系列
  { specs: ["黑色", "128GB"], id: 1001, price: 3999, stock: 10 },
  { specs: ["黑色", "256GB"], id: 1002, price: 4299, stock: 5 },
  { specs: ["黑色", "512GB"], id: 1003, price: 4999, stock: 3 },
  // 白色系列
  { specs: ["白色", "128GB"], id: 2001, price: 3999, stock: 8 },
  { specs: ["白色", "256GB"], id: 2002, price: 4299, stock: 0 }, // 库存0
  // 金色系列
  { specs: ["金色", "256GB"], id: 3002, price: 4399, stock: 6 },
  { specs: ["金色", "512GB"], id: 3003, price: 5099, stock: 2 },
];

// ================================================
// 3、 选中结果状态
// ================================================
const selectedSpecs = ref({});
const selectedSku = ref(null);

// ================================================
// 4、 处理 SKU 选中变化
// 注意点：
// (1) data.selectedSpecs：用户选中的规格 { "颜色": "黑色", "存储": "256GB" }
// (2) data.sku：完整的 SKU 对象（只有全部选完才有，否则为 null）
// ================================================
function handleSkuChange(data) {
  selectedSpecs.value = data.selectedSpecs;
  selectedSku.value = data.sku;

  // 控制台输出，方便调试
  console.log("========== SKU 选择变化 ==========");
  console.log("选中的规格:", data.selectedSpecs);
  console.log("SKU:", data.sku);
}
</script>

<style scoped>
.sku-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.sku-demo h2 {
  margin-bottom: 8px;
  color: #333;
}

.desc {
  color: #666;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.demo-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.demo-card h3 {
  margin-bottom: 20px;
  color: #333;
}

.result-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
}

.result-card h3 {
  margin-bottom: 15px;
  color: #333;
}

.result-card p {
  margin: 8px 0;
  font-size: 14px;
  word-break: break-all;
}

.result-card .tip {
  color: #999;
}
</style>
