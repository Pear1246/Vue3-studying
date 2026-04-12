<template>
  <div id="app">
    <!-- router-view 是路由的出口，所有页面都会显示在这里 -->
    <router-view />
  </div>
</template>

<script setup>
// 这个文件只是一个容器，具体内容由路由决定
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #f5f5f5;
}
</style>
