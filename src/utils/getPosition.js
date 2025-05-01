/* 点击获取某点经纬度 */
import * as Cesium from 'cesium'
export const getPosition = (viewer)=>{
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (click) {
        const ray = viewer.camera.getPickRay(click.position);
        const result = viewer.scene.globe.pick(ray, viewer.scene);
        if (Cesium.defined(result)) {
          const cartographic = Cesium.Cartographic.fromCartesian(result);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.destroy();
}
