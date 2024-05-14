<template>
  <div>
    <h2 class="mb-6">CRIAR EQUIPAMENTO</h2>
    <New-equipment />
  </div>
</template>

<script>
import NewEquipment from "./components/new-equipment.vue";

export default {
  components: { NewEquipment },
  name: "create-equipment",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>