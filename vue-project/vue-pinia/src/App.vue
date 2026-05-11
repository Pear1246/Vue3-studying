<script setup>
// 1、导入use打头得方法
import { useCounterStore } from "@/stores/counter";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
// 2、执行方法得到store实例对象
const counterStore = useCounterStore();
console.log(counterStore);

// 直接解构赋值(会造成响应式丢失)
// const { count, doubleCount } = counterStore;
// console.log(count, doubleCount);
// 直接解构得到的是两个值
//方法包裹(保持响应式更新),但此方法只负责数据的解构，不负责方法
const { count, doubleCount } = storeToRefs(counterStore);
console.log(count, doubleCount);
// 方法包裹给我们产出的是两个响应式对象

// 若要进行方法的解构，应直接从原来counterStore中解构赋值
const { increment } = counterStore;

// 触发action
onMounted(() => {
  counterStore.getList();
});
</script>

<template>
  <button @click="counterStore.increment">{{ counterStore.count }}</button>
  {{ doubleCount }}

  <ul>
    <li v-for="item in counterStore.list" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<style scoped></style>
