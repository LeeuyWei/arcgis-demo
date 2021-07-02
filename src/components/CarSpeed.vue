<template>
    <div class="car-speed-wrap">
        <div class="line-wrap" v-my-chart="lineOpt"></div>
    </div>
</template>

<script>
import myChart from "@/directives/charts.directive";
import * as _ from "lodash";
import moment from "moment";

export default {
    name: "CarSpeed",
    props: ["carId"],
    data() {
        return {
            lineOpt: {},
            moment,
        };
    },
    directives: {
        myChart,
    },
    methods: {
        getSpeedData() {
            this.axios({
                url: "http://ueyeseas.com:8088/vehicleInfo/getVehicleSpeed",
                method: "get",
                params: {
                    targetId: this.carId,
                },
            }).then(({ data }) => {
                const list = data.data;
                const xData = [];
                const sData = [];
                _.forEach(list, (item) => {
                    xData.push(moment(item.time * 1000).format("hh:mm:ss"));
                    sData.push(item.speed);
                });
                this.lineOpt = {
                    grid: {
                        right: 10,
                    },
                    legend: {
                        show: true,
                        icon: "roundRect",
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    tooltip: {
                        show: true,
                    },
                    xAxis: {
                        data: xData,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#fff",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            rotate: 60,
                        },
                    },
                    yAxis: {
                        name: "速度",
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#fff",
                            },
                        },
                    },
                    series: [
                        {
                            type: "line",
                            name: "当前车辆",
                            data: sData,
                        },
                    ],
                };
            });
        },
    },
    watch: {
        carId() {
            this.getSpeedData();
        },
    },
    mounted() {
        this.getSpeedData();
    },
};
</script>

<style lang="scss" scoped>
    .car-speed-wrap{
        height: 300px;
        background-color: rgba(0,0,0,.6);
        margin-bottom: 10px;
        .line-wrap{
            height: 100%;
            width: 100%;
        }
    }
</style>
