<template>
  <v-expansion-panel-text class="pl-4">
    <v-row no-gutters justify="end">
      <Dsg-btn :title="'Extraír relatório'"/>
    </v-row>
    <v-data-table :items="services" :headers="headers">
      <template v-slot:[`item.realized`]="{ item }">
        <div>
          <v-icon v-if="item.realized == 0">mdi-checkbox-marked</v-icon>
          <v-icon v-if="item.realized == 1">mdi-checkbox-blank-outline</v-icon>
        </div>
      </template>
    </v-data-table>
  </v-expansion-panel-text>
</template>

<script>
import DsgBtn from '@/components/common/dsg-btn.vue';
export default {
  props: ["services"],
  components: {DsgBtn},
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
          title: "Rodagem",
          value: "dateInterval",
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
          title: "Realizado",
          value: "realized",
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style>
</style>