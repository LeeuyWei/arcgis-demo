<template>
  <div class="custom-map">
    <div id="mapWrap"></div>
    <span id="info"
          style="position:absolute; left:100px; bottom: 100px; color:#0079c1; z-index:50;"></span>
    <div class="operate-wrap">
      <div class="change-base-wrap">
        <div>底图切换</div>
        <el-radio-group v-model="currentBase" @change="changeBase">
          <el-radio-button
            :key="item.value"
            size="mini"
            v-for="item in baseOpt"
            :label="item.value">
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="add-layer">
        <div>增删图层(已有{{ showLayers.length }})</div>
        <el-checkbox-group v-model="showLayers">
          <el-checkbox v-for="item in avaiLayers"
                       :key="item.name"
                       :label="item.name"
                       @change="boxChange($event,item)"
                       border>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@arcgis/core/Map';
import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import dom from "dojo/dom";

export default {
  name: 'Map',
  data() {
    return {
      sMap: null,
      sView: null,
      currentBase: 'arcgis-topographic',
      baseOpt: [
        {
          value: 'streets',
          label: 'streets',
        },
        {
          value: 'dark-gray',
          label: 'dark-gray',
        },
        {
          value: 'osm',
          label: 'osm',
        },
        {
          value: 'oceans',
          label: '海洋',
        },
      ],
      pointLayer: null,
      avaiLayers: [
        {
          name: '2020地震数据',
          url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/2020_Earthquakes/FeatureServer/0',
        },
        {
          name: '所有轨迹',
          url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/All_Trails/FeatureServer/0',
        },
      ],
      showLayers: [],
      drawLayers: {},
    };
  },
  methods: {
    initMap() {
      esriConfig.apiKey = 'AAPK314c5df5c26144fea047d2683035d5cbf62rj6RTBYp3b9Tf-5f8PCBUDeUjn6-ZFZCqbTiuEnb38pI6qGz_YLp0bqEPEGTr';
      this.sMap = new Map({
        basemap: this.currentBase,
      });
      // eslint-disable-next-line no-unused-vars
      this.sView = new MapView({
        map: this.sMap,
        // center: [121.46902, 31.23224], // Longitude, latitude
        center: [-118.80543, 34.02700],
        zoom: 9, // Zoom level
        container: 'mapWrap', // Div element
      });

      this.sView.when(() => {
        // after map loads, connect to listen to mouse move & drag events
        this.sView.on("pointer-move", this.showCoordinates);
      });
    },
    showCoordinates(evt) {
        const point = this.sView.toMap({ x: evt.x, y: evt.y });
        dom.byId("info").innerHTML = `${point.longitude.toFixed(3)}, ${point.latitude.toFixed(3)}`;
      },
    changeBase(val) {
      console.log(val);
      this.sView.map.basemap = val;
    },
    addLayer(url) {
      this.drawLayers[url] = new FeatureLayer({
        url,
      });
      this.sMap.add(this.drawLayers[url], this.showLayers.length - 1);
    },
    rmlayer(url) {
      this.sMap.remove(this.drawLayers[url]);
    },
    boxChange(event, item) {
      if (event) {
        this.addLayer(item.url);
      } else {
        this.rmlayer(item.url);
      }
    },
  },
  mounted() {
    this.initMap();
  },
  watch: {
    showLayers(newVal) {
      console.log(newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-map {
  height: 100%;
  width: 100%;
  display: flex;
  #info{
    font-size: 18px;
    font-weight: bold;
  }

  #mapWrap {
    width: 70%;
  }

  .operate-wrap {
    flex: 1;
  }
}
</style>
