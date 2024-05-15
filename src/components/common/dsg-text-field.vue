<template>
  <div>
    <label>
      {{ title }}
    </label>
    <v-tooltip v-if="tooltipText" :text="tooltipText" class="mt-0 pa-0">
      <template v-slot:activator="{ props }">
        <v-icon small class="ml-2" v-bind="props"
          >mdi-information-outline</v-icon
        >
      </template>
    </v-tooltip>

    <v-text-field
      v-bind="$attrs"
      :append-icon="appendIcon"
      @click:append="$emit('append', $event)"
      @input="$emit('input', $event)"
      hide-details
      variant="outlined"
      density="compact"
      class="mt-1"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    appendIcon: {
      type: String,
      default: "",
    },
    tooltipText: {
      tooltipText: String,
      default: null,
    },
  },
};
</script>

<style>
</style>