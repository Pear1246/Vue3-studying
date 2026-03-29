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
<!-- <script setup>
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
</template> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- watch函数 -->
<!-- <script setup>
import { ref, watch } from "vue";
const count = ref(0);
const setCount = () => {
  count.value++;
};

// TODO:watch侦听单个数据源
// watch中的第一个参数，因为是ref对象，不需要加.value
watch(count, (newVal, oldVal) => {
  console.log("count变化了", newVal, oldVal);
});
</script>

<template>
  <div>
    <button @click="setCount">+{{ count }}</button>
  </div>
</template> -->

<!-- <script setup>
// 侦听多个数据变化
import { ref, watch } from "vue";
const count = ref(0);
const changeCount = () => {
  count.value++;
};

const name = ref("cp");
const changeName = () => {
  name.value = "pc";
};

// TODO:watch侦听多个数据源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log("count或者name变化了", [newCount, newName], [oldCount, oldName]);
});
</script>

<template>
  <div>
    <button @click="changeCount">修改count--{{ count }}</button>
  </div>
  <div>
    <button @click="changeName">修改name--{{ name }}</button>
  </div>
</template> -->

<!-- <script setup>
// 立即执行immediate
import { ref, watch } from "vue";
const count = ref(0);

const setCount = () => {
  count.value++;
};

// TODO:watch立即执行
watch(
  count,
  () => {
    console.log("count变化了");
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <button @click="setCount">+{{ count }}</button>
  </div>
</template> -->

<!-- <script setup>
import { ref, watch } from "vue";
// 其中这里ref传入的是一个对象的结构
const state = ref({ count: 0 });
const changeStateByCount = () => {
  // 通过对对象的value,直接修改count，count是对象的属性
  state.value.count++;
};
// TODO:watch深度侦听
watch(
  state,
  () => {
    console.log("count变化了");
    // 若不添加深度侦听，则不会执行回调函数
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div>
    {{ state.count }}
    <button @click="changeStateByCount">通过count修改</button>
  </div>
</template> -->

<!-- <script setup>
import { ref, watch } from "vue";
// 其中这里ref传入的是一个对象的结构
const state = ref({ name: "chaichai", age: 18 });
const changeName = () => {
  // 修改name
  state.value.name = "chaichai-taecher";
};
const changAge = () => {
  // 修改age
  state.value.age = 20;
};
// TODO:精确侦听某个具体属性,只想在age变化时进行回调
watch(
  () => state.value.age,
  () => {
    console.log("age变化了");
  }
);
// 实际工作建议deep有性能损耗，故在大多数情况下避免使用deep
</script>
<template>
  <div>
    <div>当前name -- {{ state.name }}</div>
    <div>当前age -- {{ state.age }}</div>
    <div>
      <button @click="changeName">修改name</button>
      <button @click="changAge">修改age</button>
    </div>
  </div>
</template> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- <script setup>
// 生命周期函数的使用
// 1、引入函数
import { onMounted } from "vue";
// 2、执行函数 传入回调，则会自动执行回调函数内容
onMounted(() => {
  console.log("组件挂载完毕mounted执行了1");
});

onMounted(() => {
  console.log("组件挂载完毕mounted执行了2");
});
</script> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- 组合式API下的父子通信 -->
<!-- 父传子 -->
<!-- <script setup>
// setup语法糖下局部组件无需注册直接可以使用
import { ref } from "vue";
import SonCom from "./son-com.vue";
// 传递响应式数据
const count = ref(100);
// 证明count是否为响应式数据
setTimeout(() => {
  count.value = 200;
}, 3000);
</script> -->
<!-- <template> -->
<!-- <div class="father"> -->
<!-- <h2>父组件App</h2> -->
<!-- 子组件直接使用，并进行了渲染 -->
<!-- 1、绑定属性 -->
<!-- 注意响应式数据的传递前边加冒号 -->
<!-- <SonCom :count="count" message="father massage" /> -->
<!-- </div> -->
<!-- </template> -->

<!-- <style scoped></style> -->
<!-- 子传父 -->
<!-- <script setup>
import SonCom from "./son-com.vue";
const getMessage = (msg) => {
  console.log(msg);
};
</script> -->

<!-- <template>
  <div class="father">
    <h2>父组件App</h2>
     1、绑定事件 
    <SonCom @get-message="getMessage" />
  </div>
</template> -->

<!-- -------------------------大分割线------------------------------- -->
<!-- 组合式API中的模板引用 -->
<script setup>
import { onMounted, ref } from "vue";
import TestCom from "./test-com.vue";

//调用ref函数 -> ref对象
const h1Ref = ref(null);
const comRef = ref(null);
// 对象需要在组件挂载完毕之后获取
onMounted(() => {
  console.log(h1Ref.value);
  console.log(comRef.value);
});
</script>

<template>
  <!-- 2、通过ref标识绑定ref对象 -->
  <h1 ref="h1Ref">我是dom标签h1</h1>
  <TestCom ref="comRef" />
</template>
