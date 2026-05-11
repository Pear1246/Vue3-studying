import { createRouter, createWebHistory } from "vue-router";
import memberRoutes from "./modules/member.js"; // 引入会员中心的路由配置

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/member/order", // 访问根路径时自动跳转到订单列表页
    },
    // 展开会员中心的所有路由，其中用“...”是展开数组的意思
    ...memberRoutes,
  ],
});

export default router;
