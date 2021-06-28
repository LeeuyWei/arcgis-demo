<template>
    <div class="right-component">
        <div class="right-header">人口变动趋势</div>
    </div>
</template>

<script>
export default {
    name: "rightComponent",
};
</script>

<style lang="scss" scoped>
.right-component{
    .right-header {
        height: 40px;
        font-size: 24px;
        font-weight: bold;
        color: transparent;
        background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
        background-clip: text;
    }
}
</style>
