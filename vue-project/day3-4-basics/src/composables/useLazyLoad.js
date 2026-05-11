// 这是一个组合式函数 (Composable) - Vue3 的核心设计模式,其作用是把可复用的逻辑抽离出来，让组件更简洁

// 自定义懒加载逻辑
import { useIntersectionObserver } from "@vueuse/core"; // 需要安装: npm i @vueuse/core，因为此是VueUse 提供的工具库，监听元素是否进入视口
import { ref } from "vue"; // ref 创建响应式数据

// 命名规范: use + 功能名，注意哟！这是 Vue3 社区的约定
export function useLazyLoad(targetRef) {
  // targetRef 是要监听的 DOM 元素的 ref
  // isShow 表示：图片是否应该显示了（是否进入了可视区域）
  // 初始值 false，表示图片还没进入视野，先不加载
  const isShow = ref(false);

  // useIntersectionObserver 是 VueUse 提供的 API。它基于浏览器原生 API IntersectionObserver，但封装得更易用
  // 第一个参数：要监听的元素；第二个参数：回调函数，当元素可见性变化时触发
  const { stop } = useIntersectionObserver(
    targetRef, // 传入的 DOM 元素引用
    ([{ isIntersecting }]) => {
      // 解构出 isIntersecting（是否进入视口）
      if (isIntersecting) {
        isShow.value = true; // 告诉组件：可以显示真实图片了
        stop(); // 停止监听，因为已经加载过了，不需要再监听
      }
    }
  );

  // 返回 isShow，让组件知道当前是否该显示图片
  return { isShow };
}

// 使用示例（在组件中）:
// <img v-if="isShow" :src="url" />
// <div v-else class="placeholder"></div>
// const imgRef = ref(null)
// const { isShow } = useLazyLoad(imgRef)
