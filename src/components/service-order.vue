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

    <v-dialog v-model="modalOpen" :persistent="isLoading" max-width="900">
      <v-card class="pa-4" :disabled="isLoading">
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
            :loading="isLoading"
            @click="setNewServiceOrder"
          />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DsgBtn from "./common/dsg-btn.vue";
import service from "@/service/create-equipment.js";
const Service = new service();
export default {
  components: { DsgBtn },
  data: () => ({
    modalOpen: false,
    isLoading: false,

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
    async setNewServiceOrder() {
      this.isLoading = true;

      let request = this.buildRequest(this.serviceOrder)[0];

      try {
        await Service.updateEquipment(request);
        this.$store.dispatch("GET_EQUIPMENTS");
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao gerar ordem de serviços, contate o suporte!",
          type: "error",
        });
      }

      this.isLoading = false;
      this.modalOpen = false;
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
        realized: false,
        semaphore: 4,
        serviceOrder: this.getTodayDate(),
        nextMaintence: null,
        serviceName: service.serviceName,
        weekRegime: service.weekRegime,
        workRegime: service.workRegime,
      }));
    },

    getTodayDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
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