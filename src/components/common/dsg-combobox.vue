<template>
  <label>{{ title }}</label>
  <v-tooltip v-if="tooltipText" :text="tooltipText" class="mt-0 pa-0">
    <template v-slot:activator="{ props }">
      <v-icon small class="ml-2" v-bind="props">mdi-information-outline</v-icon>
    </template>
  </v-tooltip>
  <v-combobox
    v-bind="$attrs"
    :items="items"
    @update:modelValue="$emit('change', $event)"
    hide-details
    item-title="text"
    variant="outlined"
    density="compact"
    class="mt-1"
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
    tooltipText: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
</style>