<template>
  <div class="left-component">
    <div class="left-header">
      全国人口数量
    </div>
    <div class="bar-chart-wrap">

    </div>
  </div>
</template>

<script>
export default {
  name: "leftComponent",
};
</script>

<style lang="scss" scoped>
.left-component{
  .left-header {
    height: 40px;
    font-size: 24px;
    font-weight: bold;
    color: transparent;
    background: linear-gradient(to right, #ffb347, #ffcc33);
    background-clip: text;
  }
}
</style>
