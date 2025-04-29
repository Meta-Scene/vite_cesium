<script setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { TOKEN } from './stores/token.js'
import Proto from './components/proto.vue'

let viewer;
onMounted(() => {
  // 使用Cesium的Ion服务进行认证
  Cesium.Ion.defaultAccessToken = TOKEN;

  // 创建一个Viewer实例
  viewer = new Cesium.Viewer('cesiumContainer', {
    // 使用默认的影像图层和地形图层
    terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true })
  })
  // 将 viewer 提供给子组件
  provide('viewer', viewer);

})
</script>

<template>
  <div id="app">
    <div id="cesiumContainer"></div>
  </div>
  <Proto />
</template>

<style scoped>
#cesiumContainer {
  width: 98vw;
  height: 98vh;
  overflow: hidden;
}
</style>