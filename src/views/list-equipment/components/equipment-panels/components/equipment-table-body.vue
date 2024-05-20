<template>
  <v-expansion-panel-text class="pl-4">
    <v-row no-gutters justify="end" align="center" class="my-4">
      <router-link :to="`/create-services/existent/${id}`">
        <Dsg-btn :title="'Editar'" :icon="'mdi-pencil'" />
      </router-link>
    </v-row>
    <v-data-table :items="services" :headers="headers">
      <template v-slot:item="{ item }">
        <tr>
          <td :class="setBackground(item.semaphore)">
            {{ item.nextMaintence }}
          </td>
          <td>{{ item.serviceName }}</td>
          <td>{{ item.dateInterval }} Horas</td>
          <td>{{ item.workHours }} Horas</td>
          <td>{{ item.daysUsed }} Dias</td>
          <td>
            <div>
              <v-icon v-if="item.realized == 0">mdi-checkbox-marked</v-icon>
              <v-icon @click="modalOpen = true" v-if="item.realized == 1"
                >mdi-checkbox-blank-outline</v-icon
              >
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <Confirm-date :modalOpen="modalOpen" @closeModal="modalOpen = false" />
  </v-expansion-panel-text>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import ConfirmDate from "./confirm-date.vue";
export default {
  props: ["services", "id"],
  components: { DsgBtn, ConfirmDate },
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