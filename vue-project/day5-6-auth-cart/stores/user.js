import { defineStore } from "pinia"; // Pinia 的状态管理
import { ref, computed } from "vue";
import request from "@/utils/request"; // 封装的 axios 实例

export const useUserStore = defineStore("user", () => {
  // ========== State（状态）==========
  // token：用户登录凭证，存储在 localStorage 实现持久化
  // localStorage 里的数据刷新页面不会丢失
  const token = ref(localStorage.getItem("token") || "");

  // userInfo：用户详细信息，同样持久化存储
  const userInfo = ref(JSON.parse(localStorage.getItem("userInfo") || "null"));

  // ========== Getter（计算属性）==========
  // isLogin 自动计算是否已登录
  // 只要 token 有值，就认为已登录
  const isLogin = computed(() => !!token.value); // !! 把值转成布尔值

  // ========== Actions（动作）==========
  // login：登录函数
  async function login(credentials) {
    // credentials = { phone, password }
    // 发送 POST 请求到 /login 接口
    const res = await request.post("/login", credentials);

    // res.data 结构示例：
    // { token: 'eyJhbGci...', userInfo: { name: '张三', avatar: '...' } }
    token.value = res.data.token;
    userInfo.value = res.data.userInfo;

    // 持久化：把 token 和用户信息存到 localStorage
    // 这样刷新页面后还能保持登录状态
    localStorage.setItem("token", token.value);
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value));

    // 重要！登录后要把本地购物车（未登录时添加的商品）合并到服务器
    const cartStore = useCartStore(); // 获取购物车 store
    await cartStore.mergeLocalCart(); // 合并购物车

    return res;
  }

  // logout：退出登录
  function logout() {
    // 清空内存中的状态
    token.value = "";
    userInfo.value = null;
    // 清空 localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    // 清空购物车
    const cartStore = useCartStore();
    cartStore.clearCart();
  }

  // 返回暴露的内容，组件中就可以 useUserStore() 使用
  return { token, userInfo, isLogin, login, logout };
});
