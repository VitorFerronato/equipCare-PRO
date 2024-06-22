<template>
  <div>
    <v-row no-gutters align="center" justify="space-between">
      <h2 class="mb-6">LISTAGEM DE EQUIPAMENTOS</h2>
      <router-link to="/create-equipment">
        <Dsg-btn :title="'Criar'" :icon="'mdi-plus'" />
      </router-link>
    </v-row>
    <Filter-area />

    <Header-list />

    <Dsg-loading-circular v-if="isLoading" class="mt-6" />

    <Equipment-table-main
      v-if="!isLoading && filteredEquipmentsToTable.length"
      :equipments="filteredEquipmentsToTable"
    />

    <v-row
      v-if="!isLoading && !filteredEquipmentsToTable.length"
      no-gutters
      justify="center"
    >
      <h2>NENHUMA MANUTENÇÃO ENCONTRADA</h2>
    </v-row>
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import EquipmentTableMain from "./components/equipment-panels/equipment-table-main.vue";
import FilterArea from "./components/filter-area.vue";
import HeaderList from "./components/header-list.vue";
import DsgLoadingCircular from "@/components/common/dsg-loading-circular.vue";
import moment from "moment";
export default {
  components: {
    FilterArea,
    HeaderList,
    EquipmentTableMain,
    DsgBtn,
    DsgLoadingCircular,
  },
  name: "list-equipments",
  data() {
    return {};
  },

  computed: {
    filteredEquipmentsToTable() {
      console.log(this.$store.state);
      let filteredEquipments =
        this.$store?.state?.listEquipments?.filteredEquipmentsToTable ?? [];

      filteredEquipments.sort((a, b) => {
        if (a.nextMaintence === null) return 1;
        if (b.nextMaintence === null) return -1;

        const dateA = moment(a.nextMaintence, "DD/MM/YYYY");
        const dateB = moment(b.nextMaintence, "DD/MM/YYYY");

        return dateA - dateB;
      });

      return filteredEquipments;
    },

    isLoading() {
      return this.$store?.state?.listEquipments?.listEquipmentsLoading ?? false;
    },
  },
};
</script>

<style lang="scss" >
.semaphore {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
</style>