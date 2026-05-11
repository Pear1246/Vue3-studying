import { createApp } from "vue";
import App from "./App.vue"; // 导入根文件
import "./assets/main.css"; //导入样式文件

// createApp()创建一个应用实例对象
// 1、以跟组件作为参数传给了createApp(),生成一个应用实例对象
// 2、挂载到id为app的节点上，即在index.html中的id为app的标签上
createApp(App).mount("#app");
