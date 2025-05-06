<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted } from 'vue';

const viewer = inject('viewer');

onMounted(() => {
    if(viewer){
      const box_longi=120.00024339745657;
      const box_lati=30.290744653771153;
      const box_high=15;
      const box_length=50;
      const box_width=50;
      const box_height=30;
      // 坐标函数(经度，纬度，高度)
      const position = Cesium.Cartesian3.fromDegrees(box_longi, box_lati, box_high);//物体的高度从这里的高度开始往上加
      const box = new Cesium.Entity({
        id:"proto",
        position: position,
        // box: {
        //   dimensions: new Cesium.Cartesian3(box_length, box_width, box_height),//长宽高
        //   material: Cesium.Color.YELLOW.withAlpha(1),
        //   outline: true,
        //   outlineColor: Cesium.Color.WHITE,
        // },
        model: {
          uri: 'model/proto.glb',
          // minimumPixelSize: 128,
          maximumScale: 200,
        },
        description:`经度：${box_longi}°<br/>纬度：${box_lati}°<br/>高度：${box_high}m<br/>物体长宽高：(${box_length},${box_width},${box_height})`
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
