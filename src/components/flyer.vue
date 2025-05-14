<script setup>
import * as Cesium from 'cesium';
import { inject, nextTick, onMounted } from 'vue';

const viewer = inject('viewer');

onMounted(() => {

  if (viewer) {
    const centerLongitude = 120.00024339745657;
    const centerLatitude = 30.290744653771153;
    const centerHeight = 100;
    const radius = 20; // 半径

    // 圆心坐标
    const flyerCenter = Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude, centerHeight);

    // 当前时间开始
    const startTime = Cesium.JulianDate.now();
    const spr = 10; // 一圈10s

    // 实时更新位置
    const circularPosition = new Cesium.CallbackProperty(function (time, result) {
      const elapsedSeconds = Cesium.JulianDate.secondsDifference(time, startTime);
      const angle = Cesium.Math.TWO_PI * (elapsedSeconds % spr) / spr;

      //平面坐标偏移量
      const offsetX = radius * Math.cos(angle); 
      const offsetY = radius * Math.sin(angle);
      const offset = Cesium.Cartesian3.fromElements(offsetX, offsetY, 0);
      //变换矩阵
      const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(flyerCenter);
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
      <div>
        <h3>飞行物状态</h3>
          <strong>哈哈哈哈哈哈哈哈哈哈</strong><br/>
          经度：${longitude}°<br/>
          纬度：${latitude}°<br/>
          高度：${height} m<br/>
          <button id="toggleChartButton" style="z-index: 999;">显示图表</button>
      </div>`;
    }, false);

    const flightObject = new Cesium.Entity({
      id:"flyer",
      position: circularPosition,
      model: {
        uri: 'model/flyer.glb',
        // minimumPixelSize: 128,
        maximumScale: 200,
      },
      orientation: new Cesium.VelocityOrientationProperty(circularPosition),
      description: dynamicDescription,
    });

    viewer.entities.add(flightObject);

  //   nextTick(() => {
  //   const iframe = document.querySelector('.cesium-infoBox-iframe');
  //   if (iframe) {
  //     console.log("iframe存在");
  //     const src = iframe.getAttribute('src');
  //     iframe.setAttribute(
  //       'sandbox',
  //       'allow-same-origin allow-scripts allow-popups allow-forms'
  //     );
  //     // 强制重载，让新 sandbox 生效
      
  //     iframe.setAttribute('src', src);
  //   }
  // });
    // 相机聚焦飞行物
    // viewer.trackedEntity = flightObject;
    // 每次 InfoBox iframe 加载完成后，给按钮绑定事件
    // viewer.infoBox.frame.addEventListener('load', () => {
    //   const doc = viewer.infoBox.frame.contentDocument;
    //   const btn = doc.getElementById('toggleChartButton');
    //   if (btn&&!btn.__listenerAdded) {
    //     btn.__listenerAdded=true;
    //     btn.addEventListener('click', () => {
    //       console.log('按钮被点击，执行显示图表逻辑');
    //       // TODO: 在这里触发你的图表显示/隐藏逻辑
    //     });
    //   }
    // });
  } else {
    console.error('Viewer is not available');
  }
});

</script>

<template>
    <div>2222</div>
</template>

<style scoped>

</style>

