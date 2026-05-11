import { defineStore } from "pinia";
import { ref, computed } from "vue";
import request from "@/utils/request";

export const useCartStore = defineStore("cart", () => {
  // ========== State ==========
  // cartList：购物车中的商品列表
  // 每个商品结构：{ id, name, price, count, selected }
  const cartList = ref([]);

  // ========== 本地存储操作 ==========
  // 从 localStorage 加载本地购物车（未登录时添加的商品）
  function loadLocalCart() {
    const localCart = localStorage.getItem("localCart");
    if (localCart) {
      cartList.value = JSON.parse(localCart);
    }
  }

  // 保存到 localStorage
  function saveLocalCart() {
    localStorage.setItem("localCart", JSON.stringify(cartList.value));
  }

  // ========== Getters（计算属性）==========
  // 计算购物车总数量（所有商品的数量之和）
  const totalCount = computed(() =>
    cartList.value.reduce((sum, item) => sum + item.count, 0)
  );

  // 计算购物车总金额（所有商品的价格*数量之和）
  const totalPrice = computed(() =>
    cartList.value.reduce((sum, item) => sum + item.price * item.count, 0)
  );

  // 被选中的商品列表（用于结算）
  const selectedList = computed(() =>
    cartList.value.filter((item) => item.selected)
  );

  // 选中商品的总金额
  const selectedTotal = computed(() =>
    selectedList.value.reduce((sum, item) => sum + item.price * item.count, 0)
  );

  // ========== Actions ==========
  // 添加商品到购物车
  async function addToCart(product) {
    // product 结构：{ id, name, price, count }
    const userStore = useUserStore();

    if (userStore.isLogin) {
      // 已登录：调用后端接口
      await request.post("/cart/add", {
        productId: product.id,
        count: product.count,
      });
      // 添加成功后，重新从服务器获取最新购物车数据
      await fetchCart();
    } else {
      // 未登录：存到本地
      // 查找是否已存在相同商品
      const exist = cartList.value.find((item) => item.id === product.id);
      if (exist) {
        // 已存在则增加数量
        exist.count += product.count;
      } else {
        // 不存在则新增，默认选中状态
        cartList.value.push({ ...product, selected: true });
      }
      // 保存到 localStorage
      saveLocalCart();
    }
  }

  // 从服务器获取购物车数据
  async function fetchCart() {
    const res = await request.get("/cart");
    cartList.value = res.data;
  }

  // 登录时合并本地购物车到服务器
  async function mergeLocalCart() {
    // 如果本地购物车为空，直接返回
    if (!cartList.value.length) return;

    // 遍历本地购物车的每个商品，逐个添加到服务器
    for (const item of cartList.value) {
      await request.post("/cart/add", {
        productId: item.id,
        count: item.count,
      });
    }
    // 合并完成后清空本地购物车
    cartList.value = [];
    localStorage.removeItem("localCart");
    // 重新获取服务器购物车数据
    await fetchCart();
  }

  // 清空购物车
  function clearCart() {
    cartList.value = [];
    localStorage.removeItem("localCart");
  }

  // 初始化：加载本地购物车
  loadLocalCart();

  return {
    cartList,
    totalCount,
    totalPrice,
    selectedList,
    selectedTotal,
    addToCart,
    fetchCart,
    mergeLocalCart,
    clearCart,
  };
});
