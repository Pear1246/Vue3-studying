<script setup>
import { provide, ref } from "vue";
import RoomMsgItem from "./room-msg-item.vue";
// 组件嵌套关系：
// RoomPage -> RoomMsgItem -> RoomMsgComment

// 1、顶层组件提供数据
provide("data-key", "this is room data");

// 传递一个响应式的数据
const count = ref(0);
provide("count-key", count);

// 验证count为一个响应式数据
setTimeout(() => {
  count.value = 100;
}, 3000);

// 传递方法
const setCount = () => {
  count.value++;
};
provide("setCount-key", setCount);
</script>

<template>
  <div class="page">
    顶层组件
    <RoomMsgItem />
  </div>
</template>

<style scoped></style>
