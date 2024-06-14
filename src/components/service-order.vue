<template>
  <div id="service-order" class="service-order">
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

        <v-row class="my-4">
          <v-col>
            <Dsg-text-field v-model="responsible" :title="'Responsável'" />
          </v-col>
          <v-col>
            <Dsg-data-picker
              :title="'Realizada em:'"
              @setDate="orderDate = $event"
            />
          </v-col>
        </v-row>

        <v-card class="pa-4">
          <h4 class="mb-4">SERVIÇOS</h4>
          <v-data-table :headers="headers" :items="formatedServiceOrder">
            <template v-slot:[`item.equipmentName`]="{ item }">
              <td>{{ item.tagName }} - {{ item.equipmentName }}</td>
            </template>
            <template v-slot:[`item.serviceName`]="{ item }">
              <td>{{ item.serviceName.toUpperCase() }}</td>
            </template>
            <template v-slot:[`item.item`]="{ item }">
              <td>{{ item.item.itemName.toUpperCase() }}</td>
            </template>
            <template v-slot:[`item.categorie`]="{ item }">
              <td>{{ item.categorie.categorie.toUpperCase() }}</td>
            </template>
            <template v-slot:[`item.nextMaintence`]="{ item }">
              <td class="font-weight-bold">{{ setNextMaintence(item) }}</td>
            </template>
          </v-data-table>
        </v-card>

        <v-row no-gutters justify="end" class="mt-6">
          <Dsg-btn
            :title="'Confirmar'"
            :disabled="disableButton"
            @click="setNewServiceOrder"
          />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DsgBtn from "./common/dsg-btn.vue";
import DsgDataPicker from "./common/dsg-data-picker.vue";
import DsgTextField from "./common/dsg-text-field.vue";
export default {
  components: { DsgBtn, DsgTextField, DsgDataPicker },
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
      {
        title: "Próxima manutenção",
        value: "nextMaintence",
      },
    ],
  }),

  computed: {
    serviceOrder() {
      return this.$store.state.serviceOrder;
    },
    disableButton() {
      if (!this.responsible || !this.orderDate || !this.serviceOrder.length)
        return true;
      return false;
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

    setNextMaintence(service) {
      let diasCorridos = service.changePeriod / service.workRegime;
      let semanasCorridas = (diasCorridos / service.weekRegime) * 7;
      return this.addDaysToDate(this.orderDate, semanasCorridas);
    },

    addDaysToDate(dateString, daysToAdd) {
      if (!dateString || !daysToAdd) return null;
      const parts = dateString.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      date.setDate(date.getDate() + daysToAdd);

      const newDay = String(date.getDate()).padStart(2, "0");
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");
      const newYear = date.getFullYear();

      return `${newDay}/${newMonth}/${newYear}`;
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
        nextMaintence: this.setNextMaintence(service),
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