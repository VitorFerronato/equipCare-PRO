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
        <p>
          {{ nextMaintenance }}
        </p>
      </div>
    </v-row>
    <v-row>
      <v-col>
        <Dsg-text-field
          v-model="localService.workHours"
          :title="'Horas de uso'"
          placeholder="Ex: 1"
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
      <v-col>
        <Dsg-combobox
          v-model="localService.dateInterval"
          :items="intervalItems"
          :title="'Intervalo de manutenção'"
          :tooltipText="'Alguma explicação'"
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
import DsgCombobox from "@/components/common/dsg-combobox.vue";

export default {
  props: ["service", "index"],
  components: {
    DsgTextField,
    DsgBtn,
    DsgCombobox,
  },
  data() {
    return {
      localService: {},
      intervalItems: [
        {
          text: "60 dias",
          value: 60,
        },
        {
          text: "90 dias",
          value: 90,
        },
        {
          text: "7 dias",
          value: 7,
        },
        {
          text: "15 dias",
          value: 15,
        },
      ],
    };
  },

  computed: {
    nextMaintenance() {
      let service = this.localService;

      let workHours = parseFloat(this.localService.workHours);
      let daysUsed = parseFloat(service.daysUsed);
      return workHours * daysUsed;
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
