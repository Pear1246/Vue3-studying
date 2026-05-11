import { createApp } from "vue";
// 1、导入createPinia
import { createPinia } from "pinia";
import App from "./App.vue";
// 2、执行方法得到实例
const pinia = createPinia();
// 3、把pinia实例加入到app应用中
const app = createApp(App);

app.use(pinia);
app.mount("#app");
// 或可以一句话搞定createApp(App).use(pinia).mount('#app)
