<!-- 父传子 -->
<!-- <script setup>
// 2、defineprips函数（无需引入，可直接使用）接收数据
defineProps({
  message: String,
  count: Number,
});
// 在语法糖中使用数据
// const props = defineProps({
//   message: String,
// });
// console.log(props);
</script> -->

<!-- <template> -->
<!-- <div class="son"> -->
<!-- <h3>子组件Son</h3> -->
<!-- 在模板中使用数据 -->
<!-- <div>父组件传入的数据 - {{ message }} - {{ count }}</div> -->
<!-- </div> -->
<!-- </template> -->
<!-- <style scoped></style> -->

<!-- 子传父 -->
<script setup>
//2、通过defineEmits() -> emit(this.$emit),其中defineEmits()函数无需引入
const emit = defineEmits(["get-message"]);
const sendMsg = () => {
  // TODO:触发自定义事件 传数据给父组件，第一个参数为自定义事件的名字，第二个是要传递的数据
  emit("get-message", "this is son message");
};
</script>

<template>
  <div class="son">
    <div>子组件Son</div>
    <button @click="sendMsg">触发自定义事件</button>
  </div>
</template>
<style scoped></style>
