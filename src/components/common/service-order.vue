<template>
  <div class="service-order">
    <v-badge color="error" :content="formatedServiceOrder.length">
      <v-icon @click="modalOpen = true" size="40"
        >mdi-clipboard-list-outline</v-icon
      >
    </v-badge>

    <v-dialog v-model="modalOpen" max-width="900">
      <v-card class="pa-4">
        <v-row no-gutters justify="space-between" align="center">
          <h4>ORDEM DE SERVIÇO</h4>
          <v-icon @click="modalOpen = false">mdi-close</v-icon>
        </v-row>
        <v-data-table hide-default-footer :headers="headers" :items="formatedServiceOrder">
          <template v-slot:[`item.item`]="{ item }">
            <td>{{ item.item.itemName }}</td>
          </template>

          <template v-slot:[`item.categorie`]="{ item }">
            <td>{{ item.categorie.categorie }}</td>
          </template>
        </v-data-table>

        <v-row no-gutters justify="end" class="mt-6">
          <Dsg-btn :title="'Confirmar'" />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DsgBtn from "./dsg-btn.vue";
export default {
  components: { DsgBtn },
  data: () => ({
    modalOpen: false,
    formatedServiceOrder: [],
    headers: [
      {
        title: "TAG",
        value: "tagName",
        sortable: true,
      },
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
      {
        title: "Item",
        value: "item",
      },
      {
        title: "Categoria",
        value: "categorie",
      },
    ],
  }),

  computed: {
    serviceOrder() {
      return this.$store.state.serviceOrder;
    },
  },

  watch: {
    serviceOrder: {
      handler(value) {
        this.formatedServiceOrder = this.formatToTable(value);
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    formatToTable(data) {
      return data.flatMap(({ equipmentName, tagName, services }) =>
        services.map((service) => ({
          ...service,
          equipmentName,
          tagName,
        }))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.service-order {
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 10000;
}

.v-data-table-footer{
  display: none !important;
}
</style>