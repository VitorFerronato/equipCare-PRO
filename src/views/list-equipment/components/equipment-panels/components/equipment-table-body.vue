<template>
  <div>
    <v-row no-gutters justify="end" align="center" class="my-4"> </v-row>
    <v-data-table :items="services" :headers="headers">
      <template v-slot:item="{ item }">
        <tr>
          <td :class="setBackground(item.semaphore)">
            {{ item.nextMaintence }}
          </td>
          <td>{{ item.categorie.categorie }}</td>
          <td>{{ item.serviceName.toUpperCase() }}</td>
          <td>
            {{ item.item.cod.toUpperCase() }} -
            {{ item.item.itemName.toUpperCase() }}
          </td>
          <td>{{ item.changePeriod }} HORAS</td>
          <td>
            <v-checkbox
              v-model="item.realized"
              @click="addToServiceOrder(item)"
              hide-details
            ></v-checkbox>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["services", "id"],
  data() {
    return {
      headers: [
        {
          title: "Próxima manutenção",
          value: "nextMaintence",
          sortable: true,
        },
        {
          title: "Nome do serviço",
          value: "serviceName",
          sortable: true,
        },
        {
          title: "Item",
          value: "item",
          sortable: true,
        },
        {
          title: "Categoria",
          value: "categorie",
          sortable: true,
        },
        {
          title: "Periodo de troca",
          value: "changePeriod",
          sortable: true,
        },
        {
          title: "Adicionar ordem",
          value: "realized",
          sortable: true,
        },
      ],
      modalOpen: false,
    };
  },

  methods: {
    setBackground(semaphore) {
      switch (semaphore) {
        case 0:
          return "red-background";
        case 1:
          return "yellow-background";
        case 2:
          return "orange-background";
        case 3:
          return "green-background";
      }
    },
    addToServiceOrder(item) {
      item.realized = !item.realized;
      this.$store.dispatch("ADD_TO_SERVICE_ORDER", {
        service: item,
        equipmentId: this.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>