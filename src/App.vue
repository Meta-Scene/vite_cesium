<script setup>
import { onMounted, provide, ref } from 'vue'
import * as Cesium from 'cesium'
import { TOKEN } from './stores/token.js'
import Proto from './components/proto.vue'
import Flyer from './components/flyer.vue'
import Connector from './components/connector.vue'
const viewerReady = ref(false);
let viewer;
onMounted(async () => {
  // 使用Cesium的Ion服务进行认证
  Cesium.Ion.defaultAccessToken = TOKEN;

  // 创建一个Viewer实例
  viewer = new Cesium.Viewer('cesiumContainer', {
    // 使用全球地形数据，启用水面反射和水下地形渲染
    terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true }),
    infoBox: true,
  })

  provide('viewer', viewer);
  viewerReady.value = true;
})
</script>

<template>
  <div id="app">
    <div id="cesiumContainer"></div>
  </div>
  <Proto v-if="viewerReady" />
  <Flyer v-if="viewerReady" />
  <Connector v-if="viewerReady" />
</template>

<style scoped>
#cesiumContainer {
  width: 98vw;
  height: 98vh;
  overflow: hidden;
}
</style>