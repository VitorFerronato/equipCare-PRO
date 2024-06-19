<template>
  <div
    v-if="this.$route.path.startsWith('/list-equipments')"
    id="service-order"
    class="service-order"
  >
    <v-badge
      v-if="formatedServiceOrder.length"
      color="error"
      :content="formatedServiceOrder.length"
    >
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

        <v-card class="pa-4">
          <h4 class="mb-4">SERVIÇOS</h4>
          <v-data-table
            :headers="headers"
            :items="formatedServiceOrder"
            :hide-default-footer="formatedServiceOrder.length <= 5"
          >
            <template v-slot:[`item.equipmentName`]="{ item }">
              <td>{{ item.tagName }} - {{ item.equipmentName }}</td>
            </template>
            <template v-slot:[`item.serviceName`]="{ item }">
              <td>{{ item.serviceName }}</td>
            </template>
            <template v-slot:[`item.item`]="{ item }">
              <td>{{ item.item }}</td>
            </template>
            <template v-slot:[`item.categorie`]="{ item }">
              <td>{{ item.categorie }}</td>
            </template>
          </v-data-table>
        </v-card>

        <v-row no-gutters justify="end" class="mt-6">
          <Dsg-btn
            :title="'Confirmar'"
            @click="setNewServiceOrder"
          />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DsgBtn from "./common/dsg-btn.vue";
export default {
  components: { DsgBtn },
  data: () => ({
    modalOpen: false,
    responsible: null,
    orderDate: null,
    formatedServiceOrder: [],
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
    setNewServiceOrder() {
      let request = this.buildRequest(this.serviceOrder);
      console.log(request);
    },

    formatToTable(data) {
      return data.flatMap(({ equipmentName, tagName, services, id }) =>
        services.map((service) => ({
          ...service,
          equipmentName,
          tagName,
          id,
        }))
      );
    },

    buildRequest(data) {
      return data.map((newOrder) => ({
        equipmentName: newOrder.equipmentName,
        weekRegime: newOrder.weekRegime,
        workRegime: newOrder.workRegime,
        tagName: newOrder.tagName,
        semaphore: 3,
        id: newOrder.id,
        services: this.buildRequestService(newOrder.services),
      }));
    },

    buildRequestService(services) {
      return services.map((service) => ({
        categorie: service.categorie,
        changePeriod: service.changePeriod,
        idService: service.idService,
        item: service.item,
        realized: true,
        semaphore: 3,
        serviceName: service.serviceName,
        weekRegime: service.weekRegime,
        workRegime: service.workRegime,
      }));
    },
  },
};
</script>

<style lang="scss" >
.service-order {
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 10000;
}
</style>