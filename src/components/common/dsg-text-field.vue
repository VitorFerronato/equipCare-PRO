<template>
  <div>
    <label class="label-comboBox">
      <slot name="title">{{ title }}</slot>
    </label>
    <v-text-field
      v-bind="$attrs"
      :append-icon="appendIcon"
      @click:append="$emit('append', $event)"
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
      variant="outlined"
      density="compact"
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
  },
};
</script>

<style>
</style>