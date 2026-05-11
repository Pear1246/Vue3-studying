<template>
  <div class="sku">
    <!-- ========== 规格列表 ========== -->
    <!-- 遍历所有规格，比如：颜色、尺寸、内存 -->
    <div v-for="spec in specs" :key="spec.name" class="spec-item">
      <div class="spec-name">{{ spec.name }}</div>
      <div class="spec-values">
        <!-- 遍历当前规格下的所有可选值 -->
        <span
          v-for="value in spec.values"
          :key="value.name"
          :class="{
            active: isActive(spec.name, value.name), // 已选中
            disabled: isDisabled(spec.name, value.name), // 不可选
          }"
          @click="selectSpec(spec.name, value.name)"
        >
          {{ value.name }}
          <!-- 如果有图片，可以显示图片 -->
          <img v-if="value.img" :src="value.img" />
        </span>
      </div>
    </div>

    <!-- ========== 已选规格展示 ========== -->
    <div class="selected" v-if="Object.keys(selectedSpecsMap).length">
      已选: {{ Object.values(selectedSpecsMap).join(" ") }}
    </div>

    <!-- ========== SKU 结果 ========== -->
    <!-- 只有所有规格都选完时，才显示具体 SKU 信息 -->
    <div v-if="currentSku" class="result">
      <p>价格: ¥{{ currentSku.price }}</p>
      <p>库存: {{ currentSku.stock }}件</p>
      <p>SKU ID: {{ currentSku.id }}</p>
    </div>
    <!-- 未选完时的提示 -->
    <div v-else-if="selectedCount > 0" class="tip">请选择完整规格</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// ========== 接收父组件传入的数据 ==========
const props = defineProps({
  // 规格数据
  // 示例：
  // specs = [
  //   { name: '颜色', values: [{ name: '红' }, { name: '蓝' }] },
  //   { name: '尺寸', values: [{ name: 'S' }, { name: 'M' }] }
  // ]
  specs: { type: Array, required: true },

  // SKU 列表
  // 示例：
  // skuList = [
  //   { specs: ['红', 'S'], id: 1, price: 100, stock: 10 },
  //   { specs: ['红', 'M'], id: 2, price: 120, stock: 5 },
  //   { specs: ['蓝', 'S'], id: 3, price: 110, stock: 0 },
  //   { specs: ['蓝', 'M'], id: 4, price: 130, stock: 8 }
  // ]
  skuList: { type: Array, required: true },
});

const emit = defineEmits(["change"]);

// ========== 状态 ==========
// 当前选中的规格，格式：{ '颜色': '红', '尺寸': 'M' }
const selectedSpecsMap = ref({});

// 可选规格组合的路径字典（核心数据结构）
// 格式：Map { '红' => Set(ids), '红|S' => Set(ids), 'S' => Set(ids) }
const pathMap = ref(new Map());

// 已选中的规格数量（用于判断是否选完）
const selectedCount = computed(
  () => Object.keys(selectedSpecsMap.value).length
);

// ========== 核心算法：构建路径字典 ==========
// 这个算法的目的是：快速判断某个规格组合是否可选
function buildPathMap() {
  pathMap.value.clear();

  // 遍历所有 SKU（每个 SKU 代表一种有效的商品规格组合）
  props.skuList.forEach((sku) => {
    // 获取当前 SKU 规格的所有子集
    // 比如规格 ['红', 'S']，子集有：['红'], ['S'], ['红', 'S']
    const subsets = getSubsets(sku.specs);

    // 把每个子集都存到 pathMap 中
    subsets.forEach((subset) => {
      // 用 | 连接成字符串作为 key，比如 '红|S'
      const key = subset.join("|");
      if (!pathMap.value.has(key)) {
        pathMap.value.set(key, new Set());
      }
      // 记录这个子集对应的 SKU ID
      pathMap.value.get(key).add(sku.id);
    });
  });
}

// 获取数组的所有非空子集
// 例如：['红', 'S'] => [['红'], ['S'], ['红', 'S']]
function getSubsets(arr) {
  const result = [];
  // 总共有 2^n - 1 个非空子集
  const total = Math.pow(2, arr.length);
  for (let i = 1; i < total; i++) {
    const subset = [];
    for (let j = 0; j < arr.length; j++) {
      // 按位与运算：判断第 j 位是否为 1
      if (i & (1 << j)) {
        subset.push(arr[j]);
      }
    }
    result.push(subset);
  }
  return result;
}

// ========== 判断规格是否可选 ==========
// 用户点击某个规格值时，判断它是否可以被选中
function isDisabled(specName, valueName) {
  // 临时构建"假设选中这个规格"后的完整选择
  const tempSelected = { ...selectedSpecsMap.value, [specName]: valueName };
  // 取出所有已选中的值（去除非空）
  const selectedValues = Object.values(tempSelected).filter((v) => v);

  // 如果还没有选任何规格，所有规格都可选
  if (selectedValues.length === 0) return false;

  // 构建 key，比如 '红|S'
  const key = selectedValues.join("|");

  // 如果 pathMap 中有这个 key，说明这个组合有对应的 SKU，可选
  // 如果没有，说明这个组合没有 SKU，不可选（置灰）
  return !pathMap.value.has(key);
}

// ========== 判断规格是否被选中 ==========
function isActive(specName, valueName) {
  return selectedSpecsMap.value[specName] === valueName;
}

// ========== 选择规格 ==========
function selectSpec(specName, valueName) {
  // 如果不可选，直接返回
  if (isDisabled(specName, valueName)) return;

  // 如果点击的是已选中的规格，则取消选中
  if (selectedSpecsMap.value[specName] === valueName) {
    delete selectedSpecsMap.value[specName];
  } else {
    // 否则选中新规格
    selectedSpecsMap.value[specName] = valueName;
  }

  // 触发 change 事件，通知父组件
  emitChange();
}

// ========== 根据选中规格查找完整 SKU ==========
// 只有所有规格都选完了，才能找到唯一的 SKU
const currentSku = computed(() => {
  // 如果规格没选完，返回 null
  if (selectedCount.value !== props.specs.length) return null;

  // 获取已选中的规格值数组，例如 ['红', 'M']
  const selectedValues = Object.values(selectedSpecsMap.value);

  // 在 skuList 中查找匹配的 SKU
  return props.skuList.find((sku) =>
    sku.specs.every((spec, index) => spec === selectedValues[index])
  );
});

function emitChange() {
  emit("change", {
    selectedSpecs: { ...selectedSpecsMap.value }, // 选中的规格
    sku: currentSku.value, // 完整的 SKU 对象
  });
}

// ========== 初始化 ==========
buildPathMap();
</script>

<style scoped>
.spec-values span {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
/* 选中的样式 */
.spec-values span.active {
  border-color: red;
  color: red;
}
/* 不可选的样式（置灰+删除线） */
.spec-values span.disabled {
  background: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
  text-decoration: line-through;
}
.result {
  margin-top: 20px;
  padding: 10px;
  background: #f9f9f9;
}
</style>
