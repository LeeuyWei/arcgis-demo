import * as echarts from "echarts";

let myChart;
export default {
  bind(el, binding) {
    const { value } = binding;
    debugger;
    myChart = echarts.init(el);
    myChart.setOption(value);
  },
  update(el, binding) {
    const { value } = binding;
    debugger;
    myChart.setOption(value);
  },
};
