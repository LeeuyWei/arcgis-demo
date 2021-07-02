<template>
    <div class="statistic-wrap">
        <div class="statistic-row" v-for="item in listData" :key="item.prop">
            <i class="item-icon" :class="item.icon"></i>
            <div class="item-label">{{ item.label }}</div>
            <div class="item-data">{{ dataObj[item.prop] }}</div>
        </div>
        <div class="explain">
            (低速车辆定义为行驶速度低于<span>12km/h</span>的的士)
        </div>
    </div>
</template>

<script>
import * as _ from "lodash";

export default {
    name: "Statistic",
    data() {
        return {
            listData: [
                { label: "总车辆", prop: "allStatusCnt", icon: "fas fa-cars" },
                { label: "常数车辆", prop: "overSpeedCnt", icon: "fas fa-car-side" },
                { label: "低速车辆", prop: "normalSpeedCnt", icon: "fal fa-car-side" },
            ],
            dataObj: { allStatusCnt: 0, overSpeedCnt: 0, normalSpeedCnt: 0 },
        };
    },
    methods: {
        getAllData() {
            this.axios.get("http://ueyeseas.com:8088/vehicleInfo/getStatusCnt").then(({ data }) => {
                const list = data?.data;
                _.forEach(list, (v, k) => {
                    _.forEach(this.dataObj, (v2, k2) => {
                        if (k === k2) {
                            this.dataObj[k] = v;
                        }
                    });
                });
            });
        },
    },
    created() {
        this.getAllData();
    },
};
</script>

<style lang="scss" scoped>
    .statistic-wrap{
        height: 200px;
        padding: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
        position: relative;
        .explain{
            position: absolute;
            bottom: 5px;
            font-size: 12px;
            color: grey;
            span{
                font-weight: bold;
            }
        }
        .statistic-row{
            display: flex;
            font-size: 22px;
            color: #2680f3;
            position: relative;

            .item-icon{
                position: absolute;
                left: 0;
                top: calc(50% - 11px);
            }
            .item-data{
                font-weight: bold;
            }
            .item-label{
                position: relative;
                width: 120px;
                text-align: justify;
                text-align-last: justify;
                margin-left: 30px;
                margin-right: 10px;
                &:after{
                    content:":";
                    right: -5px;
                    position: absolute;
                }
            }
        }
    }
</style>
