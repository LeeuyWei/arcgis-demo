import Vue from "vue";
import * as echarts from "echarts";

const vue = new Vue();

export default {
    bind(el, binding) {
        const { value } = binding;

        vue.$nextTick(() => {
            const myCharts = echarts.init(el);
            myCharts.setOption(value);
        });
    },
    update(el, binding) {
        const { value } = binding;

        vue.$nextTick(() => {
            const myCharts = echarts.init(el);
            myCharts.setOption(value);
        });
    },
};
