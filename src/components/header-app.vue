<template>
  <nav class="header dsg-flex-center">
    <div class="">
      <h4>Equip Care PRO</h4>
    </div>
  </nav>
</template>

<script>
export default {
    
};
</script>

<style lang="scss">
@import "../design/_colors.scss";
@import "../design/_sizes.scss";
.header {
  background-color: #ccc;
  height: $header-height-lg;
  @media (max-width: 1380px) {
    height: $header-height-md;
    background-color: red;
  }
}
</style>