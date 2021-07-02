<template>
    <div class="car-heading-wrap">
        <el-table
            :data="tableData"
            height="100%">
            <el-table-column prop="time" label="时间">
                <template slot-scope="scope">
                    {{moment(scope.row.time*1000).format("YYYY-MM-DD hh:mm:ss")}}
                </template>
            </el-table-column>
            <el-table-column prop="lon" label="经度"></el-table-column>
            <el-table-column prop="lat" label="纬度"></el-table-column>
            <el-table-column prop="heading" label="方向" align="center">
                <template slot-scope="scope">
                    <i class="fas fa-arrow-circle-up"
                       :style="`transform:rotate(${scope.row.heading}deg)`">
                    </i>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "CarHeading",
    data() {
        return {
            tableData: [],
            moment,
        };
    },
    props: ["carId"],
    methods: {
        getTableData() {
            this.axios({
                url: "http://ueyeseas.com:8088/vehicleInfo/getVehiclePositionInfo",
                method: "get",
                params: {
                    targetId: this.carId,
                },
            }).then(({ data }) => {
                this.tableData = data.data;
            });
        },
    },
    watch: {
        carId() {
            this.getTableData();
        },
    },
    mounted() {
        this.getTableData();
    },
};
</script>

<style lang="scss" scoped>
    .car-heading-wrap{
        height: calc(100% - 30px - 30px - 10px - 300px - 10px - 10px);

        .fa-arrow-circle-up{
            font-size: 22px;
        }
    }
</style>
