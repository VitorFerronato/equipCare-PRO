<template>
  <v-btn :prepend-icon="icon">
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

<style>
</style>