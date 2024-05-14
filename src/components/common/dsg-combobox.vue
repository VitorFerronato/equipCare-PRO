<template>
  <label>{{ title }}</label>
  <v-combobox
    v-bind="$attrs"
    :items="items"
    @update:modelValue="$emit('change', $event)"
    item-title="text"
    variant="outlined"
    density="compact"
  ></v-combobox>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>