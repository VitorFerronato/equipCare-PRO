<template>
  <v-expansion-panel-text class="pl-4">
    <v-data-table :items="services" :headers="headers">
      <template v-slot:[`item.nextMaintence`]="{ value }">
        <td>{{ value }}</td>
      </template>
    </v-data-table>
  </v-expansion-panel-text>
</template>

<script>
export default {
  props: ["services"],
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
          title: "Horas de uso",
          value: "workHours",
          sortable: true,
        },
        {
          title: "Dias de uso",
          value: "daysUsed",
          sortable: true,
        },
        {
          title: "Rodagem",
          value: "dateInterval",
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style>
</style>