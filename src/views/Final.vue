<template>
    <div class="final-wrap">
        <div class="slide-bar left-wrap">
            <div class="right-header">武汉的士概况</div>
            <Statistic></Statistic>
            <cars-table :s-map="sMap" :s-view="sView"></cars-table>
        </div>
        <div id="mapWrap"></div>
        <div class="slide-bar right-wrap">
            <div class="right-header">的士详情</div>
            <div class="select-car-wrap">
                <div class="select-label">车辆ID:</div>
                <el-select v-model="currentCarId" size="mini" @change="carIdChange">
                    <el-option v-for="item in carsId"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <car-speed :car-id="currentCarId"></car-speed>
            <car-heading :car-id="currentCarId"></car-heading>
        </div>
    </div>
</template>

<script>
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Statistic from "@/components/Statistic.vue";
import CarsTable from "@/components/CarsTable.vue";
import CarSpeed from "@/components/CarSpeed.vue";
import CarHeading from "@/components/CarHeading.vue";
import Graphic from "@arcgis/core/Graphic";

export default {
    name: "Final",
    components: {
        Statistic, CarsTable, CarSpeed, CarHeading,
    },
    data() {
        return {
            sMap: null,
            currentBase: "topo-vector",
            currentZoom: 10,
            currentCenter: [114.3, 30.5],
            sView: null,
            globalData: [],
            carsId: [
                { label: "22507", value: "MMC8000GPSANDASYN051113-22507-00000000" },
                { label: "21605", value: "MMC8000GPSANDASYN051113-21605-00000000" },
                { label: "30324", value: "MMC8000GPSANDASYN051113-30324-00000000" },
                { label: "40363", value: "MMC8000GPSANDASYN051113-40363-00000000" },
            ],
            currentCarId: "MMC8000GPSANDASYN051113-22507-00000000",
            currentLine: null,
        };
    },
    methods: {
        carIdChange() {
            this.getLineAndDraw();
        },
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
                this.getLineAndDraw();
            });
        },
        getLineAndDraw() {
            if (this.currentLine) {
                this.sView.graphics.remove(this.currentLine);
            }
            this.axios({
                url: "http://ueyeseas.com:8088/vehicleInfo/getVehiclePosition",
                method: "get",
                params: {
                    targetId: this.currentCarId,
                },
            }).then(({ data }) => {
                const path = data.data;
                const polyline = {
                    type: "polyline",
                    paths: path,
                };
                const lineSymbol = {
                    type: "simple-line", // autocasts as SimpleLineSymbol()
                    color: "#05f3c3",
                    width: 4,
                };
                this.currentLine = new Graphic({
                    geometry: polyline,
                    symbol: lineSymbol,
                    popupTemplate: {
                        // autocasts as new PopupTemplate()
                        title: "{Name}",
                    },
                });
                this.sView.graphics.add(this.currentLine);
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
        .right-header{
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #fff;
        }
    }

    .left-wrap {
        left: 0;
    }

    .right-wrap {
        right: 0;
        .select-car-wrap{
            height: 30px;
            display: flex;
            margin-bottom: 10px;
            .select-label{
                line-height: 30px;
                color: #fff;
                width: 60px;
            }
            .el-select{
                width: calc(100% - 60px);
            }
        }
    }
}
</style>
