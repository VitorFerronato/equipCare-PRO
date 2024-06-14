<template>
  <v-card
    class="pa-4 mt-4"
    :class="invalidInputsBorder == 'red' ? 'red-border' : 'green-border'"
  >
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
          :disabled="itemsLoading || !items.length"
          :loading="itemsLoading"
        />
      </v-col>
      <Create-item-modal :type="'item'" class="mt-7 ml-n2" />

      <v-col>
        <Dsg-combobox
          v-model="localService.categorie"
          :title="'Categoria'"
          :items="categories"
          :itemTitle="'categorie'"
          :itemValue="'id'"
          :disabled="categoriesLoading || !categories.length"
          :loading="categoriesLoading"
        />
      </v-col>
      <Create-item-modal :type="'categorie'" class="mt-7 ml-n2 mr-4" />
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
          @setDate="localService.lastMaintence = $event"
          placeholder="Ex: 4"
          hide-spin-buttons
        />
      </v-col>
    </v-row>
    <v-row no-gutters align="center" class="mt-8">
      <h4>Próxima manutenção:</h4>
      <span
        v-if="proximaManutencao && !localService.manualDate"
        class="next-maintence font-weight-bold mx-2"
        >{{ proximaManutencao }} -
        {{ convertDateToWeekDay(proximaManutencao) }}
      </span>
      <span
        v-if="localService.manualDate"
        class="next-maintence font-weight-bold mx-2"
        >{{ localService.manualDate }} -
        {{ convertDateToWeekDay(localService.manualDate) }}
      </span>

      <Dsg-data-picker-icon
        v-if="proximaManutencao"
        @setDate="localService.manualDate = $event"
      />

      <v-spacer></v-spacer>
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
import CreateItemModal from "./create-item-categorie-modal.vue";
import DsgDataPickerIcon from "@/components/common/dsg-data-picker-icon.vue";
export default {
  props: [
    "service",
    "index",
    "items",
    "categories",
    "weekRegime",
    "workRegime",
  ],
  components: {
    DsgTextField,
    DsgBtn,
    DsgCombobox,
    DsgDataPicker,
    CreateItemModal,
    DsgDataPickerIcon,
  },
  data() {
    return {
      localService: {},
      manualDate: null,
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

    proximaManutencao() {
      return this.addDaysToDate(
        this.localService.lastMaintence,
        this.semanasConvertidasEmDias
      );
    },

    invalidInputsBorder() {
      if (
        !this.localService.serviceName ||
        !this.localService.item ||
        !this.localService.categorie
      )
        return "red";

      return !this.proximaManutencao ? "red" : "blue";
    },

    itemsLoading() {
      return this.$store?.state?.getItemsLoading ?? false;
    },
    categoriesLoading() {
      return this.$store?.state?.getCategoriesLoading ?? false;
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
        this.$emit(
          "setNewService",
          { ...newValue, proximaManutencao: this.proximaManutencao },
          this.index
        );
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    dsgFormatDate,

    addDaysToDate(dateString, daysToAdd) {
      if (!dateString || !daysToAdd) return null;
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

    convertDateToWeekDay(date) {
      if (!date) return null;
      const dateParts = date.split("/");
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Janeiro é 0
        const year = parseInt(dateParts[2], 10);
        const date = new Date(year, month, day);
        const dayOfWeekIndex = date.getDay();
        const daysOfWeek = [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ];
        return daysOfWeek[dayOfWeekIndex];
      }
    },

    deleteService() {
      this.$emit("deleteService", this.index);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/design/_colors.scss";

.next-maintence {
  border-radius: 5px;
  padding: 0.5rem;
  border: 0.5px solid #b6b6b6;
}
</style>
