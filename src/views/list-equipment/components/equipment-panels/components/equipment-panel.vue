<template>
  <v-expansion-panel style="border-left: 5px solid red; border-radius: 5px">
    <v-expansion-panel-title>
      <h4>{{ equipment.equipmentName }}</h4>
    </v-expansion-panel-title>

    <Equipment-table-body :services="equipment.services" />
  </v-expansion-panel>
</template>

<script>
import EquipmentTableBody from "./equipment-table-body.vue";
export default {
  components: { EquipmentTableBody },
  props: ["equipment"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>