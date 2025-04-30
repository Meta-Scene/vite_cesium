<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted } from 'vue';

const viewer = inject('viewer');

onMounted(() => {
    if(viewer){
        // 坐标函数(经度，纬度，高度)
        const position = Cesium.Cartesian3.fromDegrees(120.00024339745657, 30.290744653771153, 0);//高度从底部开始算
        const box = new Cesium.Entity({
          position: position,
          box: {
            dimensions: new Cesium.Cartesian3(50, 50, 30),//长宽高
            material: Cesium.Color.YELLOW.withAlpha(1),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
          },
          description:'111111'
        });
        
        viewer.entities.add(box);

        // 相机位置
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(120.00031355134273, 30.288583114762623, 200),
          orientation: {
            heading: Cesium.Math.toRadians(0), 
            pitch: Cesium.Math.toRadians(-30), 
            roll: 0,
          },
          duration: 3, // 飞行持续时间
        });
        // const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        // handler.setInputAction(function (click) {
        //     const ray = viewer.camera.getPickRay(click.position);
        //     const result = viewer.scene.globe.pick(ray, viewer.scene);
        //     if (Cesium.defined(result)) {
        //       const cartographic = Cesium.Cartographic.fromCartesian(result);
        //       const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        //       const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        //       console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
        //     }
        // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    else {
        console.error("Viewer is not available");
    }
});
</script>

<template>
  <div>111111</div>
</template>

<style scoped></style>
