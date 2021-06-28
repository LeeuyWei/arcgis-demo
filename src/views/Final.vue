<template>
    <div class="final-wrap">
        <div class="slide-bar left-wrap">
            <left-component :global-data="globalData"></left-component>
        </div>
        <div id="mapWrap"></div>
        <div class="slide-bar right-wrap">
            <right-component :global-data="globalData"></right-component>
        </div>
    </div>
</template>

<script>
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import leftComponent from "@/components/leftComponent.vue";
import rightComponent from "@/components/rightComponent.vue";

export default {
    name: "Final",
    components: {
        leftComponent, rightComponent,
    },
    data() {
        return {
            sMap: null,
            currentBase: "topo-vector",
            currentZoom: 4,
            currentCenter: [108.5525, 34.3227],
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
            this.getGlobalData();
        },
        getGlobalData() {
            this.axios.get("https://cxqttkl.github.io/web4gis15/china.geojson")
                .then((res) => {
                    this.globalData = res.data.features;
                });
        },
        drawDistrict() {
            const jsonLayer = new GeoJSONLayer({
                url: "https://cxqttkl.github.io/web4gis15/china.geojson",
            });
            jsonLayer.popupTemplate = new PopupTemplate({
                title: "{ENGLISH}",
                content: "点击了{ENGLISH},2000年人口是{pop2000}，2010年人口是{pop2010}",
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
