<template>
  <v-btn prepend-icon="mdi-plus">
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
  },
};
</script>

<style>
</style>