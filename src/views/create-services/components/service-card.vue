<template>
  <v-card class="pa-4 mt-4">
    <v-row align="center">
      <v-col cols="12" md="5" lg="8">
        <Dsg-text-field
          v-model="localService.serviceName"
          :title="'Nome do serviço'"
        />
      </v-col>

      <div class="mt-5">
        <p>Próxima manutenção</p>
        <p>
          {{
            localService.nextMaintenance ? localService.nextMaintenance : "-"
          }}
        </p>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <Dsg-text-field
          v-model="localService.dateInterval"
          :title="'Intervalo de manutenção'"
          :tooltipText="'Alguma explicação'"
        />
      </v-col>
      <v-col>
        <Dsg-text-field
          v-model="localService.workHours"
          :title="'Horas de uso'"
        />
      </v-col>
      <v-col>
        <Dsg-text-field
          v-model="localService.daysUsed"
          :title="'Dias de uso'"
        />
      </v-col>
    </v-row>

    <v-row justify="end" no-gutters class="mt-4">
      <Dsg-btn :title="'Excluir'" @click="deleteService" class="mr-4" />
      <Dsg-btn :title="'Confirmar'" @click="saveService" />
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgBtn from "@/components/common/dsg-btn.vue";

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
  watch: {
    service: {
      handler(newVal) {
        this.localService = newVal;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    deleteService() {
      this.$emit("deleteService", this.index);
    },
    saveService() {
      this.$emit("saveService", this.localService, this.index);
    },
  },
};
</script>

<style>
/* Seu estilo */
</style>
