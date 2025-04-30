<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted, ref } from 'vue';

const viewer = inject('viewer');

const flightPosition = ref(null);

onMounted(() => {
  if (viewer) {
    // 飞行物的起始位置
    let startPosition = Cesium.Cartesian3.fromDegrees(120.00024339745657, 30.290744653771153, 400);
    let endPosition = Cesium.Cartesian3.fromDegrees(120.00124339745657, 30.291744653771153, 400);

    // 创建飞行物
    const flightObject = new Cesium.Entity({
      position: startPosition,
      model: {
        uri: 'model/flyer.glb',
        minimumPixelSize: 128,
        maximumScale: 200,
      },
    });
    viewer.entities.add(flightObject);
    viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(120.00031355134273, 30.288583114762623, 200),
          orientation: {
            heading: Cesium.Math.toRadians(0), 
            pitch: Cesium.Math.toRadians(-30), 
            roll: 0,
          },
          duration: 3, // 飞行持续时间
        });

  } else {
    console.error('Viewer is not available');
  }
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>
