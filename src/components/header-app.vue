<template>
  <nav class="header header-color dsg-flex-center px-5">
    <router-link to="/list-equipments">
      <h4 class="text-white">Equip Care PRO</h4>
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../design/_colors.scss";
@import "../design/_sizes.scss";
.header {
  height: $header-height-lg;
  width: 100%;
  z-index: 100000;

  @media (max-width: $medium-breakpoint) {
    height: $header-height-md;
    background-color: #ccc;
  }
}
</style>