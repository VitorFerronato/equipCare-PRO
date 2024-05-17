<template>
  <v-expansion-panel :class="setBorder(equipment.semaphore)">
    <v-expansion-panel-title>
      <h4>{{ equipment.equipmentName.toUpperCase() }}</h4>
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

  methods: {
    setBorder(semaphore) {
      switch (semaphore) {
        case 0:
          return "red-border";
        case 1:
          return "yellow-border";
        case 2:
          return "orange-border";
        case 3:
          return "green-border";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>