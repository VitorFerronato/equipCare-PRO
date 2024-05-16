<template>
  <v-expansion-panels elevation="5" class="mt-6">
    <Equipment-panel
      v-for="equipment in equipments"
      :key="equipment.id"
      :equipment="equipment"
    />
  </v-expansion-panels>
</template>

<script>
import EquipmentPanel from "./components/equipment-panel.vue";
export default {
  props: ["equipments"],
  components: { EquipmentPanel },
};
</script>

<style>
</style>
