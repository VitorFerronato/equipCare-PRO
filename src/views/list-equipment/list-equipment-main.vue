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

    <Equipment-panels-main :equipments="equipments" />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import EquipmentPanelsMain from "./components/equipment-panels/equipment-panels-main.vue";
import FilterArea from "./components/filter-area.vue";
import HeaderList from "./components/header-list.vue";
import { mapState } from "vuex";
export default {
  components: { FilterArea, HeaderList, EquipmentPanelsMain, DsgBtn },
  name: "list-equipments",
  data() {
    return {};
  },

  computed: {
    ...mapState(["equipments"]),
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