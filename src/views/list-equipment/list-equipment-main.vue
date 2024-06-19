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

    <Equipment-table-main v-else :equipments="equipmentsToTable" />

    <v-row
      v-if="!isLoading && equipmentsToTable.length <= 0"
      no-gutters
      justify="center"
    >
      <h2>NENHUM EQUIPAMENTO ENCONTRADO</h2>
    </v-row>
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import EquipmentTableMain from "./components/equipment-panels/equipment-table-main.vue";
import FilterArea from "./components/filter-area.vue";
import HeaderList from "./components/header-list.vue";
import DsgLoadingCircular from "@/components/common/dsg-loading-circular.vue";
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
    return {
      equipmentsToTable: [],
    };
  },

  computed: {
    equipments() {
      return this.$store?.state?.equipments ?? [];
    },

    isLoading() {
      return this.$store?.state?.listEquipmentsLoading ?? false;
    },
  },

  watch: {
    equipments: {
      handler(value) {
        if (!value.length) return;

        this.equipmentsToTable = this.flattenEquipments(value);
        console.log(this.equipmentsToTable);
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    flattenEquipments(equipments) {
      return equipments.flatMap((equipment) =>
        equipment.services.map((service) => ({
          equipmentName: equipment?.equipmentName.toUpperCase() ?? "-",
          tagName: equipment?.tagName.toUpperCase() ?? "-",
          semaphore: equipment.semaphore,
          id: equipment.id,
          serviceName: service?.serviceName.toUpperCase() ?? "-",
          item: service?.item?.itemName.toUpperCase() ?? "-",
          categorie: service?.categorie?.categorie.toUpperCase() ?? "-",
          changePeriod: service.changePeriod,
          nextMaintence: service.nextMaintence,
          workRegime: service.workRegime,
          weekRegime: service.weekRegime,
          realized: service.realized,
          idService: service.idService,
          hasServiceOrder: service.hasServiceOrder || null,
        }))
      );
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