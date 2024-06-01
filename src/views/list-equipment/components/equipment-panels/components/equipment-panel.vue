<template>
  <v-expansion-panel :class="setBorder(equipment.semaphore)">
    <v-expansion-panel-title>
      <v-row no-gutters justify="space-between" align="center" class="mr-4">
        <h4>{{ equipmentTitle }}</h4>
        <h4>{{ workInfo }}</h4>
      </v-row>
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <v-row no-gutters justify="end">
        <Dsg-btn
          :title="'Editar'"
          :icon="'mdi-pencil'"
          @click="editEquipment"
        />
      </v-row>
      <Equipment-table-body :services="equipment.services" :id="equipment.id" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import EquipmentTableBody from "./equipment-table-body.vue";
export default {
  components: { EquipmentTableBody, DsgBtn },
  props: ["equipment"],
  data() {
    return {};
  },

  computed: {
    equipmentTitle() {
      return `${this.equipment?.tagName ?? "-"} - ${
        this.equipment?.equipmentName ?? "-"
      } `;
    },

    workInfo() {
      return `${this.equipment?.workRegime ?? "-"} Horas por dia - ${
        this.equipment?.weekRegime ?? "-"
      } Dias por semana`;
    },
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

    editEquipment() {
      this.$router.push({
        name: "create-services",
        query: { data: JSON.stringify(this.equipment) },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>