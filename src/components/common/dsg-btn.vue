<template>
  <v-btn :prepend-icon="icon" v-bind="$attrs" class="btn-color">
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Botão",
    },
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/design/_colors.scss";

.btn-color {
  background-color: $btn-color;
  color: #fff;
}
</style>