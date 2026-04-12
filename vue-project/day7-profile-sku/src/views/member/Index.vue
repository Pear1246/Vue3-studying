<template>
  <div class="member-container">
    <!-- 左侧菜单栏 -->
    <div class="member-sidebar">
      <h3>会员中心</h3>
      <ul>
        <li>
          <router-link to="/member/order" active-class="active"
            >我的订单</router-link
          >
        </li>
        <!-- SKU演示菜单项 -->
        <li>
          <router-link to="/member/sku" active-class="active"
            >SKU演示</router-link
          >
        </li>
        <li>
          <router-link to="/member/info" active-class="active"
            >个人资料</router-link
          >
        </li>
      </ul>
    </div>

    <!-- 右侧内容区 -->
    <div class="member-content">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.member-container {
  display: flex;
  min-height: 100vh;
}
.member-sidebar {
  width: 250px;
  background: #fff;
  border-right: 1px solid #eee;
  padding: 20px;
}
.member-sidebar h3 {
  margin-bottom: 20px;
}
.member-sidebar ul {
  list-style: none;
}
.member-sidebar li {
  margin-bottom: 10px;
}
.member-sidebar a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
}
.member-sidebar a.active {
  background: #ff6b6b;
  color: #fff;
}
.member-sidebar a:hover:not(.active) {
  background: #f0f0f0;
}
.member-content {
  flex: 1;
  padding: 20px;
}
</style>
