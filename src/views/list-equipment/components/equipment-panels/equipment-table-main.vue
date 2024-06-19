<template>
  <div class="mt-6">
    <v-data-table
      :hide-default-footer="equipments.length <= 5"
      :items="equipments"
      :headers="headers"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td :class="setBackground(item.semaphore)">
            {{ item.nextMaintence }}
          </td>
          <td>{{ item.equipmentName }}</td>
          <td>{{ item.serviceName }}</td>
          <td>
            {{ item.item }}
          </td>
          <td>{{ item.categorie }}</td>
          <td>{{ item.changePeriod }} HORAS</td>

          <td>
            <v-icon
              v-if="!item.markToOrder"
              @click="addToServiceOrder(item)"
            >
              mdi-checkbox-blank-outline
            </v-icon>

            <v-icon
              v-if="item.markToOrder"
              @click="addToServiceOrder(item)"
            >
              mdi-checkbox-marked
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["equipments"],
  data: () => ({
    headers: [
      {
        title: "Próxima manutenção",
        value: "nextMaintence",
        sortable: true,
      },
      {
        title: "Equipamento",
        value: "EquipmentName",
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
        sortable: false,
      },
    ],
  }),

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

    addAllToOrder() {
      this.equipments
        .filter((service) => !service.realized)
        .forEach((service) => this.addToServiceOrder(service));
    },

    addToServiceOrder(item) {
      this.$store.dispatch("ADD_TO_SERVICE_ORDER", {
        service: item,
        equipmentId: item.id,
      });
    },
  },
};
</script>

<style>
</style>
