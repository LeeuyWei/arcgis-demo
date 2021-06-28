import * as echarts from 'echarts';

class MyCharts {
    drawBarCharts(el, opt) {
        const myCharts = echarts.init(el);
        myCharts.setOption(opt);
    }
}

export default new MyCharts();
