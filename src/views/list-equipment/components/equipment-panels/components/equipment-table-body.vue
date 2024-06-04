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
          <td>{{ item.item.cod.toUpperCase() }} - {{ item.item.itemName.toUpperCase() }}</td>
          <td>{{ item.changePeriod }} HORAS</td>
        </tr>
      </template>
    </v-data-table>
    <Confirm-date :modalOpen="modalOpen" @closeModal="modalOpen = false" />
  </div>
</template>

<script>
import ConfirmDate from "./confirm-date.vue";
export default {
  props: ["services", "id"],
  components: { ConfirmDate },
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
  },
};
</script>

<style lang="scss" scoped>
</style>