<template>
  <div id="app">
    <div id="cesiumContainer"></div>
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import * as Cesium from 'cesium'

onMounted(() => {
  // 使用Cesium的Ion服务进行认证
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZTY1OWNkMC04NzljLTRkZTMtOThjMC1mOGIyNWY3ODFiNTEiLCJpZCI6Mjg5OTE1LCJpYXQiOjE3NDM1MDA1ODV9.N64gmBwiSB07prZgTjPrK0Q-GwCfIVCJHU9BKf7UbBg';

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