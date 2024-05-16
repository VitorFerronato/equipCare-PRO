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

    <Equipment-panels-main />
  </div>
</template>

<script>
import EquipmentPanelsMain from "./components/equipment-panels/equipment-panels-main.vue";
import FilterArea from "./components/filter-area.vue";
import HeaderList from "./components/header-list.vue";
export default {
  components: { FilterArea, HeaderList, EquipmentPanelsMain },
  name: "list-equipments",
  data() {
    return {};
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