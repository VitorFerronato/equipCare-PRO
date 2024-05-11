<template>
  <v-card v-if="equipment" class="pa-4 mt-6">
    <v-row align="center" class="mb-4">
      <h2>{{ equipment }}</h2>
      <v-icon @click="addNewService" class="ml-2">mdi-plus-box</v-icon>
      <v-spacer></v-spacer>
      <v-btn @click="save"> Salvar </v-btn>
    </v-row>

    <v-row v-for="(service, index) in services" :key="index">
      <v-col cols="12" md="3">
        <Dsg-text-field v-model="service.serviceName" :title="'Serviço'" />
      </v-col>
      <v-col>
        <Dsg-text-field v-model="service.interval" :title="'Intervalo'" />
      </v-col>
      <v-col>
        <Dsg-text-field v-model="service.workedHours" :title="'Horas de uso'" />
      </v-col>
      <v-col>
        <Dsg-text-field v-model="service.daysWorked" :title="'Dias de uso'" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import { mapState } from "vuex";

export default {
  components: { DsgTextField },
  data() {
    return {
      services: [],
    };
  },

  computed: {
    ...mapState(["equipment"]),
  },

  methods: {
    addNewService() {
      this.services.push({
        serviceName: null,
        interval: null,
        workedHours: null,
        daysWorked: null,
      });
    },

    save() {
      console.log(this.services[0].serviceName);
    },
  },
};
</script>

<style>
</style>