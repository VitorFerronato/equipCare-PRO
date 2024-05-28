<template>
  <v-card class="pa-4 mt-4">
    <v-row align="center">
      <v-col cols="12" md="4" lg="6 ">
        <Dsg-text-field
          v-model="localService.serviceName"
          :title="'Nome do serviço'"
          placeholder="Ex: Troca de óleo"
        />
      </v-col>
      <v-col>
        <Dsg-combobox
          v-model="localService.item"
          :title="'Item/Peça'"
          :items="items"
          :itemTitle="'itemName'"
          :itemValue="'cod'"
        />
      </v-col>

      <v-col>
        <Dsg-combobox
          v-model="localService.categorie"
          :title="'Categoria'"
          :items="categories"
          :itemTitle="'categorie'"
          :itemValue="'id'"       
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <Dsg-text-field
          v-model="localService.changePeriod"
          :title="'Período de troca/Manutenção'"
          :tooltipText="'A cada quanto tempo essa manutenção precisa ser feita'"
          placeholder="Ex: 30"
          suffix="Horas de uso"
          type="number"
          hide-spin-buttons
        />
      </v-col>
      <v-col cols="12" md="4" lg="4">
        <Dsg-data-picker
          :title="'Data da ultima troca'"
          :tooltipText="'Caso nenhum valor for estipulado, ira considerar o dia atual'"
          @setDate="date = $event"
          placeholder="Ex: 4"
          hide-spin-buttons
        />
      </v-col>
    </v-row>
    <v-row justify="space-between" no-gutters class="mt-4">
      <h4>Próxima manutenção: {{ nextMaintenance }}</h4>
      <Dsg-btn :title="'Excluir'" @click="deleteService" />
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgBtn from "@/components/common/dsg-btn.vue";
import { dsgFormatDate } from "@/utils/dsg-format-date.js";
import DsgCombobox from "@/components/common/dsg-combobox.vue";
import DsgDataPicker from "@/components/common/dsg-data-picker.vue";
export default {
  props: ["service", "index", "items", "categories"],
  components: {
    DsgTextField,
    DsgBtn,
    DsgCombobox,
    DsgDataPicker,
  },
  data() {
    return {
      localService: {},
      date: null,
      weekRegime: null,
      workRegime: null,
    };
  },

  computed: {
    diasCorridos() {
      return this.localService.changePeriod / this.workRegime;
    },

    semanasCorridas() {
      return this.diasCorridos / this.weekRegime;
    },

    semanasConvertidasEmDias() {
      return this.semanasCorridas * 7;
    },

    nextMaintenance() {
      return this.addDaysToDate("25/05/2024", 8);
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
    addDaysToDate(dateString, daysToAdd) {
      console.log(dateString, daysToAdd);
      const parts = dateString.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      date.setDate(date.getDate() + daysToAdd);

      const newDay = String(date.getDate()).padStart(2, "0");
      const newMonth = String(date.getMonth() + 1).padStart(2, "0");
      const newYear = date.getFullYear();

      return `${newDay}/${newMonth}/${newYear}`;
    },

    deleteService() {
      this.$emit("deleteService", this.index);
    },
  },

  created() {
    let equipment = JSON.parse(this.$route.query.data);
    this.workRegime = parseFloat(equipment.workRegime);
    this.weekRegime = parseFloat(equipment.weekRegime);
  },
};
</script>

<style>
/* Seu estilo */
</style>
