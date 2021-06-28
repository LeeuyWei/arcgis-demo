<template>
    <div class="left-component">
        <div class="left-header">
            全国人口数量
        </div>
        <div class="bar-chart-wrap" ref="barWrap"></div>
    </div>
</template>

<script>
import myCharts from "@/service/charts.service";

export default {
    name: "leftComponent",
    data() {
        return {
            barData: {},
        };
    },
    directives: {
        barChart,
    },
    methods: {
        drawBar() {
            myCharts.drawBarCharts(this.$refs.barWrap, this.barData);
        },
    },
    mounted() {
        this.drawBar();
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
        background: linear-gradient(to right, #ffb347, #ffcc33);
        background-clip: text;
    }

    .bar-chart-wrap {
        height: calc(100% - 40px);
        width: 100%;
        position: relative;
        .bar-content{
            height: 100%;
            width: 100%;
        }
    }
}
</style>
