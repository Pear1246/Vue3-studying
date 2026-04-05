# Day5-6总结

##### 1、Token 登录流程（核心流程）

（1）登录成功 → 后端返回 token
（2）token存到localStorage（刷新不丢失）
（3）每次请求在header加Authorization: Bearer xxx
（4）token过期 → 后端返回401 → 前端清空token跳转登录

2.、购物车双模式（重要！离线体验的关键）

| 状态   | 数据存储          | 操作方式           |
| ------ | ----------------- | ------------------ |
| 未登录 | `localStorage`    | 本地增删改查       |
| 已登录 | 后端接口          | 调用 API           |
| 登录时 | 合并本地 → 服务器 | `mergeLocalCart()` |

#### 3. 登录合并购物车逻辑
```javascript
async function mergeLocalCart() {
  for (const item of cartList.value) {
    await request.post('/cart/add', item)  // 逐个添加到服务器
  }
  cartList.value = []  // 清空本地
  localStorage.removeItem('localCart')  // 删除本地存储
  await fetchCart()  // 重新获取服务器数据
}
```

