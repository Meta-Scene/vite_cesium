<script setup>
import * as Cesium from 'cesium'
import { inject } from 'vue'
const viewer = inject('viewer')
// 创建实体所在的坐标
const position = Cesium.Cartesian3.fromDegrees(113.3, 39.9, 5000)

const box = new Cesium.Entity({
    position: position, //位置
    box: {
        dimensions: new Cesium.Cartesian3(4000, 3000, 5000), //盒子的长宽高
        material: Cesium.Color.RED.withAlpha(0.5), //盒子颜色
        outline: true, //边框
        outlineColor: Cesium.Color.WHITE, //边框颜色
    },
});

// 将立方体添加到场景中
viewer.entities.add(box);

</script>

<template>
    <div>111111</div>
</template>

<style></style>