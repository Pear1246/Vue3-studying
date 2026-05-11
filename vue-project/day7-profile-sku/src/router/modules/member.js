// 功能：会员中心模块的路由配置（嵌套路由）
// 位置：src/router/modules/member.js
// ================================================

export default [
  {
    path: "/member",
    // 注意：使用动态导入（import()）实现路由懒加载
    // 好处：只有访问该页面时才加载对应组件，减少首屏加载时间
    component: () => import("@/views/member/Index.vue"),
    children: [
      {
        // 订单列表页：/member/order
        path: "order",
        component: () => import("@/views/member/OrderList.vue"),
      },
      // ========================================
      // SKU 演示页路由：/member/sku
      // 用途：测试 SKU 规格选择器组件
      // ========================================
      {
        path: "sku",
        component: () => import("@/views/member/SkuDemo.vue"),
      },
      {
        // 空路径默认重定向到订单列表
        path: "",
        redirect: "order",
      },
    ],
  },
];
