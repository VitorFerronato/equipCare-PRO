<template>
  <v-card class="pa-4 mt-4">
    <v-row align="center">
      <v-col cols="12" md="5" lg="8">
        <Dsg-text-field
          v-model="localService.serviceName"
          :title="'Nome do serviço'"
          placeholder="Ex: Troca de óleo"
        />
      </v-col>

      <div class="mt-5">
        <p>Próxima manutenção</p>
        <p>{{ dsgFormatDate(nextMaintenance) }}</p>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <Dsg-text-field
          v-model="localService.dateInterval"
          :title="'Rodagem'"
          placeholder="Ex: 8000"
          suffix="Horas"
          type="number"
          hide-spin-buttons
        />
      </v-col>
      <v-col>
        <Dsg-text-field
          v-model="localService.workHours"
          :title="'Horas de uso'"
          placeholder="Ex: 4"
          suffix="Horas"
          type="number"
          hide-spin-buttons
        />
      </v-col>
      <v-col>
        <Dsg-text-field
          v-model="localService.daysUsed"
          :title="'Dias de uso'"
          placeholder="Ex: 4"
          suffix="Dias"
          type="number"
          hide-spin-buttons
        />
      </v-col>
    </v-row>

    <v-row justify="end" no-gutters class="mt-4">
      <Dsg-btn :title="'Excluir'" @click="deleteService" class="mr-4" />
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgBtn from "@/components/common/dsg-btn.vue";
import { dsgFormatDate } from "@/utils/dsg-format-date.js";
export default {
  props: ["service", "index"],
  components: {
    DsgTextField,
    DsgBtn,
  },
  data() {
    return {
      localService: {},
    };
  },

  computed: {
    nextMaintenance() {
      let service = this.localService;

      let workHours = parseFloat(service.workHours);
      let daysUsed = parseFloat(service.daysUsed);
      let dateInterval = parseFloat(service.dateInterval);

      let remainingHours = dateInterval - workHours * daysUsed;
      const currentDate = new Date();

      const nextMaintenanceDate = new Date(
        currentDate.getTime() + remainingHours * 60 * 60 * 1000
      );

      return nextMaintenanceDate;
    },
  },

  watch: {
    service: {
      handler(newVal) {
        this.localService = newVal;
      },
      immediate: true,
      deep: true,
    },

    localService: {
      handler(newValue) {
        this.$emit("setNewService", newValue, this.index);
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    dsgFormatDate,

    deleteService() {
      this.$emit("deleteService", this.index);
    },
  },
};
</script>

<style>
/* Seu estilo */
</style>
