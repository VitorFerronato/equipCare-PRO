<template>
  <div>
    <h2 class="mb-6">ORDENS DE SERVIÇO</h2>

    <Filter-area />

    <Order-history-list v-if="orders.length" :orders="orders"/>

    <v-row v-if="!orders.length" no-gutters justify="center" class="mt-6">
      <h2>NENHUMA ORDEM ENCONTRADA</h2>
    </v-row>
  </div>
</template>

<script>
import FilterArea from "./components/filter-area.vue";
import OrderHistoryList from "./components/order-history-list.vue";

export default {
  components: {
    FilterArea,
    OrderHistoryList,
  },
  name: "list-service-orders",
  data() {
    return {};
  },

  computed: {
    orders() {
      return this.$store?.state?.orderHistory ?? [];
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