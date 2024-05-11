<template>
  <div>
    <h2 class="mb-6">CRIAR EQUIPAMENTO</h2>
      <New-equipment />
      <New-service />
  </div>
</template>

<script>
import NewEquipment from "./components/new-equipment.vue";
import NewService from "./components/new-service.vue";

export default {
  components: { NewEquipment, NewService },
  name: "create-equipment",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>