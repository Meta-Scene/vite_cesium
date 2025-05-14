<script setup>
import { onMounted, provide, ref, nextTick } from 'vue'
import * as Cesium from 'cesium'
import { TOKEN } from './stores/token.js'
import Proto from './components/proto.vue'
import Flyer from './components/flyer.vue'
import Connector from './components/connector.vue'
// import * as echarts from 'echarts';

const viewerReady = ref(false);
let viewer;
// const showChart = ref(false); // 是否显示
// const echartsContainer = ref(null);
// let myChart = null; // 图表实例

onMounted(async () => {
  // 使用Cesium的Ion服务进行认证
  Cesium.Ion.defaultAccessToken = TOKEN;

  // 创建一个Viewer实例
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true }),
    infoBox: true,
  });

  provide('viewer', viewer);
  viewerReady.value = true;
});

// // 切换图表显示状态
// const toggleChart = () => {
//   showChart.value = !showChart.value;

//   if (showChart.value) {
//     nextTick(() => {
//       if (!myChart) {
//         myChart = echarts.init(echartsContainer.value);
//       }

//       const option = {
//         title: {
//           text: '示例图表',
//         },
//         tooltip: {},
//         xAxis: {
//           type: 'category',
//           data: ['A', 'B', 'C', 'D', 'E'],
//         },
//         yAxis: {
//           type: 'value',
//         },
//         series: [
//           {
//             data: [1, 2, 3, 4, 5],
//             type: 'line',
//             smooth: true,
//           },
//         ],
//       };

//       myChart.setOption(option);
//     });
//   } else {
//     // 隐藏时销毁
//     if (myChart) {
//       myChart.dispose();
//       myChart = null; 
//     }
//   }
// };
</script>

<template>
  <div id="app">
    <div id="cesiumContainer"></div>
    <!-- 按钮 -->
    <!-- <button @click="toggleChart" style="position: absolute; top: 20px; left: 20px; z-index: 999;">
      显示图表
    </button> -->
    <!-- 图表 -->
    <!-- <div
      v-if="showChart"
      ref="echartsContainer"
      style="position: absolute; bottom: 20px; right: 20px; width: 400px; height: 300px; background: white; z-index: 999; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.2);"
    ></div> -->
    <!-- 组件 -->
    <Proto v-if="viewerReady" />
    <Flyer v-if="viewerReady" />
    <Connector v-if="viewerReady" />
  </div>
</template>

<style scoped>
#cesiumContainer {
  width: 98vw;
  height: 98vh;
  overflow: hidden;
}
</style>
