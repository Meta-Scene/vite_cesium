<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted, ref } from 'vue';

const viewer = inject('viewer');

const flightPosition = ref(null); // 用于存储飞行物体的位置

onMounted(() => {
  if (viewer) {
    // 坐标函数(经度，纬度，高度) 用于放置立方体物体
    const position = Cesium.Cartesian3.fromDegrees(120.00024339745657, 30.290744653771153, 0); // 高度从底部开始算
    const box = new Cesium.Entity({
      position: position,
      box: {
        dimensions: new Cesium.Cartesian3(50, 50, 30), // 长宽高
        material: Cesium.Color.YELLOW.withAlpha(1),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
      },
    });

    viewer.entities.add(box);

    // 飞行物体的起始位置
    let startPosition = Cesium.Cartesian3.fromDegrees(120.00024339745657, 30.290744653771153, 1000); // 高度 1000 米
    let endPosition = Cesium.Cartesian3.fromDegrees(120.00124339745657, 30.291744653771153, 1000); // 飞行结束位置

    // 创建飞行物体（例如：飞机）
    // const flightObject = new Cesium.Entity({
    //   position: startPosition,
    //   model: {
    //     uri: 'path_to_your_3d_model.gltf', // 如果你有自己的 3D 模型，可以在这里替换
    //     minimumPixelSize: 64,
    //     maximumScale: 20000,
    //   },
    // });
    const flightObject = new Cesium.Entity({
      position: startPosition,
      box: {
        dimensions: new Cesium.Cartesian3(50, 50, 20), // 长 50 米，宽 50 米，高 20 米
        material: Cesium.Color.RED.withAlpha(1), // 红色，透明度 1
        outline: true, // 显示边框
        outlineColor: Cesium.Color.WHITE, // 边框颜色为白色
      },
    });

    viewer.entities.add(flightObject);

    // 设置飞行动画（从起始点飞到目标点）
    const flightDuration = 40; // 飞行时间为 10 秒

    // 使用 Cesium 的动画来模拟飞行物体的移动
    let flightTime = 0;
    viewer.clock.onTick.addEventListener(function () {
      flightTime += viewer.clock.deltaTime; // 增加飞行时间
      const flightProgress = flightTime / flightDuration;

      if (flightProgress <= 1) {
        // 计算飞行物的当前位置（线性插值）
        const currentPosition = Cesium.Cartesian3.lerp(startPosition, endPosition, flightProgress, new Cesium.Cartesian3());
        flightObject.position = currentPosition; // 更新飞行物的位置
      } else {
        // 飞行完成后，停止动画
        flightTime = 0;
        const temp = startPosition;
        startPosition = endPosition;
        endPosition = temp;
      }
    });

    // 相机位置，确保可以看到飞行物体
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(120.00031355134273, 30.288583114762623, 2000),
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
  <div>查看固定物体和飞行物体</div>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
