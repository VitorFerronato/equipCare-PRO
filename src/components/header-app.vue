<template>
  <nav class="header dsg-flex-center px-5">
    <h4>Equip Care PRO</h4>
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
  position: fixed;
  top: 0;
  background-color: #ccc;

  @media (max-width: $medium-breakpoint) {
    height: $header-height-md;
    background-color: red;
  }
}
</style>