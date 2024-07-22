<template>
  <div class="mt-6">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(order, index) in orders"
        :key="order.orderId"
        class="mt-2"
      >
        <v-expansion-panel-title>
          <v-row no-gutters justify="space-between"
            ><span class="font-weight-bold">ORDEM 00{{ index + 1 }}</span>
            <v-icon @click="$emit('printOrder')">mdi-printer</v-icon>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-data-table
            :headers="headers"
            :items="order.services"
            :hide-default-footer="orders.length <= 5"
          >
          </v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: ["orders"],
  data: () => ({
    headers: [
      {
        title: "Equipamento",
        value: "equipmentName",
        sortable: true,
      },
      {
        title: "Serviço",
        value: "serviceName",
        sortable: true,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.undone {
  width: 100px;
  text-align: center;
  border-radius: 5px;
  padding: 12px 0rem;
  color: white;
  background-color: #b00020;
}

.done {
  width: 100px;
  text-align: center;
  padding: 12px 0rem;
  border-radius: 5px;
  color: white;
  background-color: #1d8527;
}
</style>
