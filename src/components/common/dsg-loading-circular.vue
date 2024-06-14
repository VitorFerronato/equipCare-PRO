<template>
  <v-row no-gutters justify="center">
    <v-progress-circular
      :size="size"
      :color="color"
      indeterminate
    ></v-progress-circular>
  </v-row>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: Number,
      default: 50
    },
  }
};
</script>

<style>
</style>