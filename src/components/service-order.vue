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
        <v-row no-gutters justify="space-between" align="center" class="mb-4">
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
            @click="setOrderJob"
          />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import DsgBtn from "./common/dsg-btn.vue";
import service from "@/service/create-equipment.js";
import serviceHistory from "@/service/orders-history";
const ServiceHistory = new serviceHistory();
const Service = new service();

export default {
  components: { DsgBtn },
  data: () => ({
    modalOpen: false,
    isLoading: false,

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
    formatedServiceOrder: [],
  }),

  computed: {
    serviceOrder() {
      return this.$store.state.serviceOrder?.serviceOrder ?? [];
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
      return data.flatMap(({ equipmentName, tagName, services, id }) =>
        services.map((service) => ({
          ...service,
          equipmentName,
          tagName,
          idOrder: id,
        }))
      );
    },

    async setOrderJob() {
      let paramForRequest = this.serviceOrder;

      this.isLoading = true;
      await this.setToOrderHistory(paramForRequest);
      await this.setNewServiceOrder(paramForRequest);
      await this.$store.dispatch("GET_ORDER_HISTORY");
      this.isLoading = false;
      this.modalOpen = false;
      this.$store.commit("snackbar/set", {
        message: "Sucesso ao gerar ordem de serviço",
        type: 'success',
      });
    },

    async setNewServiceOrder(paramForRequest) {
      let request = await this.buildRequest(paramForRequest);

      try {
        await Service.updateEquipment(request);
        await this.$store.commit("CLEAN_SERVICE_ORDER");
        await this.$store.dispatch("GET_EQUIPMENTS");
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao gerar ordem de serviços, contate o suporte!",
          type: "error",
        });
      }
    },

    async setToOrderHistory(paramForRequest) {
      let request = this.buildHistoryRequest(paramForRequest);

      try {
        await ServiceHistory.setNewOrderHistory(request[0]);
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao inserir ordem no histórico, contate o suporte!",
          type: "error",
        });
      }
    },

    async buildRequest(data) {
      let foundedEquipment = await this.$store.dispatch(
        "GET_EQUIPMENT_BY_ID",
        data[0]?.id
      );

      foundedEquipment.services.forEach((e) => {
        data[0].services.forEach((s) => {
          if (e.serviceId == s.serviceId) {
            (e.semaphore = 4), (e.serviceOrder = moment().format("DD/MM/YYYY"));
            e.nextMaintence = null;
          }
        });
      });

      return foundedEquipment;
    },

    buildHistoryRequest(data) {
      console.log(data);
      return data[0].services.map((el) => ({
        situation: false,
        orderId: Math.floor(Math.random() * 1000),
        serviceId: el.serviceId,
        creationDate: moment().format("DD/MM/YYYY"),
        equipmentName: el.equipmentName,
        serviceName: el.serviceName,
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