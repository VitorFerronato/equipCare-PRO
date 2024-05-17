<template>
  <v-snackbar v-model="isOpen" :color="setColor(snackbarData.type)">{{
    snackbarData.message
  }}</v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    setColor(color) {
      if (!color) return;
      if (color == "info") return "#3c5ca7";
      return color;
    },
  },
  computed: {
    snackbarData() {
      return this.$store.getters["snackbar/snackbarData"];
    },
  },
  watch: {
    isOpen: {
      handler(value) {
        if (!value) {
          this.$store.commit("snackbar/reset");
        }
      },
      immediate: true,
      deep: true,
    },
    snackbarData: {
      handler(value) {
        this.isOpen = value.message && value.type ? true : false;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
</style>
