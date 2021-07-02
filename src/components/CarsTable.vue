<template>
    <div class="cars-table-wrap">
        <div class="table-wrap">
            <el-table
                :data="tableData"
                height="100%">
                <el-table-column label="车牌号" prop="carNo" align="center" width="70">
                    <template slot-scope="scope">
                        {{getSimpleCarNo(scope.row)}}
                    </template>
                </el-table-column>
                <el-table-column label="时间" prop="record_time" align="center">
                    <template slot-scope="scope">
                        {{momentFun(scope.row.record_time*1000).format("YYYY-MM-DD HH:mm:ss")}}
                    </template>
                </el-table-column>
                <el-table-column label="位置" prop="location" align="center" width="60">
                    <template slot-scope="scope">
                        <span class="location-wrap" @click="drawPoint(scope.row)">
                            <i class="fas fa-map-marked-alt"></i>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-wrap"></div>
    </div>
</template>

<script>
import moment from "moment";
import Graphic from "@arcgis/core/Graphic";

export default {
    name: "CarsTable",
    data() {
        return {
            tableData: [],
            currentNo: 1,
            currentSize: 20,
            totalSize: 0,
            momentFun: moment,
            pointMap: {},
        };
    },
    props: ["sMap", "sView"],
    methods: {
        drawPoint(row) {
            const point = {
                type: "point",
                longitude: row.lon,
                latitude: row.lat,
            };
            const markerSymbol = {
                type: "simple-marker",
                color: "#00e1f6",
                outline: {
                    color: [255, 255, 255],
                    width: 2,
                },
            };
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol,
            });
            this.sView.graphics.add(pointGraphic);
        },
        getSimpleCarNo(row) {
            let carNo = row.target_id;
            carNo = carNo.substring(24, 29);
            return carNo;
        },
        getTableData() {
            this.axios({
                url: "http://ueyeseas.com:8088/vehicleInfo/getAllVehicleInfo",
                method: "get",
                params: {
                    pageNum: this.currentNo,
                    pageSize: this.currentSize,
                },
            }).then(({ data }) => {
                const tb = data?.data;
                this.tableData = tb.data;
                this.totalSize = tb.totalCount;
            });
        },
    },
    created() {
        this.getTableData();
    },
};
</script>

<style lang="scss" scoped>
    .cars-table-wrap{
        height: calc(100% - 250px);
        background-color: rgba(0,0,0,.5);
        .page-wrap{
            height: 30px;
        }
        .table-wrap{
            height: calc(100% - 30px);
            .location-wrap{
                cursor: pointer;
                i{
                    font-size: 20px;
                }
            }
        }
    }
</style>
