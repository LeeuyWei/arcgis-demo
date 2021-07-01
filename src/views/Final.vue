<template>
    <div class="final-wrap">
        <div class="slide-bar left-wrap">
        </div>
        <div id="mapWrap"></div>
        <div class="slide-bar right-wrap">
        </div>
    </div>
</template>

<script>
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";

export default {
    name: "Final",
    components: {
    },
    data() {
        return {
            sMap: null,
            currentBase: "topo-vector",
            currentZoom: 10,
            currentCenter: [114.3, 30.5],
            sView: null,
            globalData: [],
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
                center: this.currentCenter,
                zoom: this.currentZoom, // Zoom level
                container: 'mapWrap', // Div element
            });

            // eslint-disable-next-line no-underscore-dangle
            this.sView.ui._removeComponents(['zoom', 'navigation-toggle', "attribution", "compass"]);
            this.sView.when(() => {
                this.drawDistrict();
            });
        },
        drawDistrict() {
            const jsonLayer = new GeoJSONLayer({
                url: "https://cxqttkl.github.io/gis2018/武汉市.json",
            });
            jsonLayer.popupTemplate = new PopupTemplate({
                title: "{name}",
                content: "点击了{name},行政区代码是{adcode}",
            });
            this.sMap.add(jsonLayer);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
.final-wrap {
    #mapWrap {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
    }

    .slide-bar {
        width: 400px;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        position: absolute;
        z-index: 2;
        padding: 10px;
    }

    .left-wrap {
        left: 0;
    }

    .right-wrap {
        right: 0;
    }
}
</style>
