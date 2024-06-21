<template>
  <div>
    <h2 class="mb-6">ORDENS DE SERVIÇO</h2>

    <Filter-area />

    <Dsg-loading-circular v-if="false" class="mt-6" />

    <Order-history-list />

    <!-- <v-row
      v-if="!isLoading && equipmentsToTable.length <= 0"
      no-gutters
      justify="center"
    >
      <h2>NENHUMA ORDEM ENCONTRADA</h2>
    </v-row> -->
  </div>
</template>

<script>
import FilterArea from "./components/filter-area.vue";
import DsgLoadingCircular from "@/components/common/dsg-loading-circular.vue";
import OrderHistoryList from "./components/order-history-list.vue";

export default {
  components: {
    FilterArea,
    DsgLoadingCircular,
    OrderHistoryList,
  },
  name: "list-service-orders",
  data() {
    return {};
  },

  computed: {},
};
</script>

<style lang="scss" >
.semaphore {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
</style>