<!-- 一、组合API——setup选项 -->
<!-- <script>
export default {
  setup() {
    console.log("setup");
    // 数据
    const message = "this is message";
    const logMessage = () => {
      // 函数
      console.log(message);
    };
    // 在setup中的数据和方法，必须通过return才可以在模板中使用
    return {
      message,
      logMessage,
    };
  },
  beforeCreate() {
    console.log("brforeCreate");
  },
};
</script> -->

<!-- setup语法糖，简化代码 -->
<!-- <script setup>
const message = "this is message";
const logMessage = () => {
  // 函数
  console.log(message);
};
</script> -->

<!-- 输出结果是先“setup”后“beforeCreate”，故可知setup()在beforeCreate()前执行 -->
<!-- <template>
  <div>
    {{ message }}
    <button @click="logMessage">log</button>
  </div>
</template> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- 二、组合式API——reactive()&ref() -->
<!-- <script setup> 
reactive()
// 1、导入函数
import { reactive } from "vue";

// 2、执行函数 传入一个对象类型参数(eg.数组),变量接收
const state = reactive({
  count: 0, //这里是一个常规对象，但将对象传给reactive函数，使得state就是一个响应式对象，故可以引发我们视图的更新(即在template中)
});

const setCount = () => {
  state.count++;
};

------------------小分割线------------------------

ref()
1、导入ref()函数
import { ref } from "vue";

// 2、执行函数 传入参数[简单类型/对象类型] 变量接受

const count = ref(0); //同理，ref函数一样也会将我们的简单类型对象包装成响应类型对象
console.log(count);

const setCount = () => {
  // 脚本区域修改ref生成的响应式对象数据，必须通过.value属性
  count.value++;
};

</script> -->

<!-- <template>

  <div>
    <button @click="setCount">{{ state.count }}</button>
    <button @click="setCount">{{ count }}</button>
  </div>
</template> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- computed() -->
<script setup>
// 原始响应式数据
import { ref } from "vue";
const list = ref([1, 2, 3, 4, 5, 6, 7, 8]);
// 1、导入computed
import { computed } from "vue";
// 2、执行函数 return计算之后的值 变量接收
const computedList = computed(() => {
  // 做计算 根据一个数据计算得到一个新的数据
  return list.value.filter((item) => item > 2);
});

// 检查list.value是否是一个计算属性的值
setTimeout(() => {
  list.value.push(9, 10);
}, 3000);
// 结果会发现，3秒钟过后怕，两个显示的数组后边都会加上9和10这两个数
</script>

<template>
  <div>原始响应式数组 - {{ list }}</div>
  <div>计算属性数组 - {{ computedList }}</div>
</template>
