<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted } from 'vue';

const viewer = inject('viewer');

onMounted(() => {
  if (viewer) {
    const centerLongitude = 120.00024339745657;
    const centerLatitude = 30.290744653771153;
    const centerHeight = 100;
    const radius = 20; // 半径

    // 圆心
    const centerCartesian = Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude, centerHeight);

    // 当前时间开始
    const startTime = Cesium.JulianDate.now();
    const secondsPerRound = 10; // 一圈10s

    // 实时更新位置
    const circularPosition = new Cesium.CallbackProperty(function (time, result) {
      const elapsedSeconds = Cesium.JulianDate.secondsDifference(time, startTime);
      const angle = Cesium.Math.TWO_PI * (elapsedSeconds % secondsPerRound) / secondsPerRound;

      // 根据角度计算圆上点的经纬度偏移
      const offsetX = radius * Math.cos(angle); 
      const offsetY = radius * Math.sin(angle);

      // 使用 Cesium.Cartesian3.add 不直接修改常量 centerCartesian
      const offset = Cesium.Cartesian3.fromElements(offsetX, offsetY, 0);
      const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(centerCartesian);
      const position = Cesium.Matrix4.multiplyByPoint(matrix, offset, new Cesium.Cartesian3());

      return position;
    }, false);

    // 实时显示经纬度和高度
    const dynamicDescription = new Cesium.CallbackProperty((time) => {
      const cartesian = circularPosition.getValue(time);
      if (!cartesian) return '飞行物正在加载';
    
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const height = cartographic.height.toFixed(2);
    
      return `
          <strong>哈哈哈哈哈哈哈哈哈哈</strong><br/>
          经度：${longitude}°<br/>
          纬度：${latitude}°<br/>
          高度：${height} m
      `;
    }, false);

    const flightObject = new Cesium.Entity({
      id:"flyer",
      position: circularPosition,
      model: {
        uri: 'model/flyer.glb',
        minimumPixelSize: 128,
        maximumScale: 200,
      },
      orientation: new Cesium.VelocityOrientationProperty(circularPosition),
      description: dynamicDescription,
    });

    viewer.entities.add(flightObject);

    // 相机聚焦飞行物
    // viewer.trackedEntity = flightObject;

  } else {
    console.error('Viewer is not available');
  }
});
</script>

<template>
  <div>22222</div>
</template>

<style scoped></style>

