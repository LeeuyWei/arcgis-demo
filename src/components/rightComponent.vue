<template>
    <div class="right-component">
        <div class="right-header">人口变动趋势</div>
        <div class="right-content">
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    height="100%">
                    <el-table-column v-for="item in tableHeader"
                                     :key="item.prop"
                                     :label="item.label"
                                     :prop="item.prop">
                    </el-table-column>
                    <el-table-column label="增长率" prop="rate">
                        <template slot-scope="scope">
                            <span :style="scope.row.rate*1>0?'color:red':'color:green'">
                                {{ scope.row.rate }}%
                            </span>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div class="pie-wrap" v-charts-directive="pieOpt"></div>
        </div>
    </div>
</template>

<script>
import * as _ from "lodash";
import chartsDirective from "@/directives/charts.directive";

export default {
    name: "rightComponent",
    directives: {
        chartsDirective,
    },
    props: {
        globalData: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            tableHeader: [
                {
                    label: "名称",
                    prop: "ENGLISH",
                },
                {
                    label: "2000人口",
                    prop: "pop2000",
                },
                {
                    label: "2010人口",
                    prop: "pop2010",
                },
            ],
            tableData: [],
            pieOpt: {},
        };
    },
    methods: {
        initTableData() {
            _.forEach(this.globalData, (item) => {
                this.tableData.push({
                    ENGLISH: item.properties.ENGLISH,
                    pop2000: item.properties.pop2000,
                    pop2010: item.properties.pop2010,
                    rate: ((item.properties.pop2010 - item.properties.pop2000) / item.properties.pop2000 * 100).toFixed(2),
                });
            });
            this.drawPie();
        },
        drawPie() {
            const pieData = [];
            _.forEach(this.tableData, (item) => {
                pieData.push({
                    value: item.pop2010 * 1,
                    name: item.ENGLISH,
                });
            });
            this.pieOpt = {
                title: {
                    text: "2010人口占比",
                    left: "center",
                    textStyle: {
                        color: "#fff",
                    },
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    show: false,
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: pieData,
                    },
                ],
            };
        },
    },
    watch: {
        globalData() {
            this.initTableData();
        },
    },
};
</script>

<style lang="scss" scoped>
.right-component {
    height: 100%;

    .right-header {
        height: 40px;
        font-size: 24px;
        font-weight: bold;
        color: transparent;
        background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
        background-clip: text;
    }

    .right-content {
        height: calc(100% - 40px);

        .table-wrap {
            height: calc(50% - 5px);
            margin-bottom: 10px;
        }
        .pie-wrap{
            height: calc(50% - 5px);
        }
    }

}
</style>
