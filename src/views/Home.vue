<template>
  <div class="home">
    <div class="title">准备好了吗</div>
    <el-button @click="goMap">开始😵</el-button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods: {
    goMap() {
      this.$router.push({ name: "Map" });
    },
  },
};
</script>
<style lang="scss" scoped>
  .home{
    background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
      font-size: 52px;
      color: #fff;
    }
    .el-button{
      width: 120px;
      font-size: 18px;

      background-image: linear-gradient( 135deg, #FCCF31 10%, #F55555 100%);
    }
  }
</style>
