<script setup>
import * as Cesium from 'cesium';
import { inject, onMounted, onBeforeUnmount } from 'vue';

const viewer = inject('viewer');
let timer = null;
let lineAdded = false;

onMounted(() => {
  if (!viewer) {
    console.error('Viewer 未注入');
    return;
  }

  timer = setInterval(() => {
    const proto = viewer.entities.getById('proto');
    const flight = viewer.entities.getById('flyer');

    if (proto && flight && !lineAdded) {
      const lineEntity = new Cesium.Entity({
        id: 'connector',
        polyline: {
          positions: new Cesium.CallbackProperty(() => {
            const time = Cesium.JulianDate.now();
            const posA = proto.position.getValue(time);
            const posB = flight.position.getValue(time);
            if (!posA || !posB) return [];
            return [posA, posB];
          }, false),
          width: 2,
          material: Cesium.Color.BLUE.withAlpha(0.8),
        }
      });

      viewer.entities.add(lineEntity);
      lineAdded = true;
      clearInterval(timer);
      console.log('线已添加');
    } else {
      console.log('等待实体加载');
    }
  }, 300);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>

<template>
<div>3333</div>
</template>
