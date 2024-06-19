<template>
  <div v-if="isLoading" class="main-div">
    <div class="welcome-info">
      <h2>CARREGANDO</h2>
      <Dsg-loading-circular :color="'#fff'" :size="80" class="mt-6" />
    </div>
  </div>
</template>

<script>
import DsgLoadingCircular from "./common/dsg-loading-circular.vue";
export default {
  components: { DsgLoadingCircular },
  data: () => ({
    isLoading: true,
  }),

  async created() {
    this.isLoading = true;
    await this.$store.dispatch("GET_EQUIPMENTS");
    await this.$store.dispatch("GET_ITEMS");
    await this.$store.dispatch("GET_CATEGORIES");
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.main-div {
  background-color: #12192c;
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 20000;

  .welcome-info {
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>