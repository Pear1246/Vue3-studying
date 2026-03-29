<script setup>
import { ref } from "vue";

// 在script中组件的内部属性和方法式不开放给父组件访问的
const name = ref("test name");
const setName = () => {
  name.value = "test new name";
};

// 通过调用defineExpose()方法将子组件内部的属性和方法暴露给父组件
defineExpose({
  name,
  setName,
});
</script>

<template>
  <div>我是test组件</div>
</template>
