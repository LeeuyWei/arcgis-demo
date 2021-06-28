<template>
    <div class="left-component">
        <div class="left-header">
            全国人口数量
        </div>
        <div class="chart-wrap">
            <div class="bar-chart-wrap" ref="barWrap"></div>
            <div class="line-wrap" ref="lineWrap"></div>
        </div>

    </div>
</template>

<script>
import myCharts from "@/service/charts.service";
import * as _ from "lodash";

export default {
    name: "leftComponent",
    data() {
        return {
        };
    },
    props: {
        globalData: {
            type: Array,
            default: () => ([]),
        },
    },
    directives: {
    },
    methods: {
        drawBar() {
            const city = [];
            const data2000 = [];
            const data2010 = [];
            _.forEach(this.globalData, (item) => {
                city.push(item.properties.ENGLISH);
                data2000.push(item.properties.pop2000);
                data2010.push(item.properties.pop2010);
            });
            const barOpt = {
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
                    data: city,
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
                    name: "百万",
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#fff",
                        },
                    },
                    axisLabel: {
                        formatter: (value) => `${value / 1000000}`,
                    },
                },
                series: [
                    {
                        type: "bar",
                        name: "2000年",
                        data: data2000,
                    },
                    {
                        type: "bar",
                        name: "2010年",
                        data: data2010,
                    },
                ],
            };
            const lineOpt = {
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
                    data: city,
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
                    name: "百万",
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#fff",
                        },
                    },
                    axisLabel: {
                        formatter: (value) => `${value / 1000000}`,
                    },
                },
                series: [
                    {
                        type: "line",
                        name: "2000",
                        data: data2000,
                    },
                    {
                        type: "line",
                        name: "2010",
                        data: data2010,
                    },
                ],
            };
            myCharts.drawBarCharts(this.$refs.barWrap, barOpt);
            myCharts.drawBarCharts(this.$refs.lineWrap, lineOpt);
        },
    },
    mounted() {
    },
    watch: {
        globalData() {
            this.drawBar();
        },
    },
};
</script>

<style lang="scss" scoped>
.left-component {
    height: 100%;

    .left-header {
        height: 40px;
        font-size: 24px;
        font-weight: bold;
        color: transparent;
        background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);
        background-clip: text;
    }
    .chart-wrap{
        height: calc(100% - 40px);
        width: 100%;
        position: relative;

        .bar-chart-wrap {
            height: calc(50% - 5px);
            background-color: rgba(0,0,0,0.7);
            margin-bottom: 10px;
        }
        .line-wrap{
            height: calc(50% - 5px);
            background-color: rgba(0,0,0,0.7);
        }
    }

}
</style>
