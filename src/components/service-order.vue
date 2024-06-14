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
          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="formatedServiceOrder"
          >
            <template v-slot:[`item.equipmentName`]="{ item }">
              <td>{{ item.tagName }} - {{ item.equipmentName }}</td>
            </template>
            <template v-slot:[`item.item`]="{ item }">
              <td>{{ item.item.itemName }}</td>
            </template>
            <template v-slot:[`item.categorie`]="{ item }">
              <td>{{ item.categorie.categorie }}</td>
            </template>
            <template v-slot:[`item.delete`]="{ item }">
              <td>
                <v-icon color="red" @click="removeItem(item)"
                  >mdi-delete-outline</v-icon
                >
              </td>
            </template>
          </v-data-table>
        </v-card>

        <v-row no-gutters justify="end" class="mt-6">
          <Dsg-btn :title="'Confirmar'" />
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
        title: "Remover",
        value: "delete",
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
      return data.flatMap(({ equipmentName, tagName, services, id }) =>
        services.map((service) => ({
          ...service,
          equipmentName,
          tagName,
          id,
        }))
      );
    },

    removeItem(item) {
      this.$store.dispatch("ADD_TO_SERVICE_ORDER", {
        service: item,
        equipmentId: item.id,
      });
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
</style>