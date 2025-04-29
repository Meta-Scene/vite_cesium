<template>
  <div id="app">
    <div id="cesiumContainer"></div>
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import TOKEN from './stores/token.js'

onMounted(() => {
  // 使用Cesium的Ion服务进行认证
  Cesium.Ion.defaultAccessToken = TOKEN;

  // 创建一个Viewer实例
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // 使用默认的影像图层和地形图层
    terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true })
  })

})
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>