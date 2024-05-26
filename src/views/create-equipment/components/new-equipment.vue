<template>
  <v-card class="pa-4">
    <v-row class="mb-2">
      <v-col cols="12" md="3" lg="4">
        <Dsg-text-field
          v-model="equipmentName"
          :title="'Nome do equipamento'"
          placeholder="Digite o nome do equipamento ( Obrigatório )"
        />
      </v-col>
      <v-col cols="12" md="3" lg="4">
        <Dsg-text-field
          v-model="tagName"
          :title="'Nome da Tag'"
          placeholder="Nome da tag ( obrigatório )"
        />
      </v-col>
    </v-row>
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="2">
        <Dsg-text-field
          v-model="workRegime"
          :title="'Regime de trabalho/dia'"
          :tooltipText="'Quantas horas por dia ele trabalha'"
          placeholder="Ex: 4  "
          suffix="Horas por dia"
          type="number"
          hide-spin-buttons
        />
      </v-col>
      <v-col cols="12" md="2">
        <Dsg-text-field
          v-model="weekRegime"
          :title="'Regime de trabalho/semana'"
          :tooltipText="'Quantos dias por semana ele trabalha'"
          placeholder="Ex: 2 "
          suffix="Dias por semana"
          type="number"
          hide-spin-buttons
        />
      </v-col>
      <Dsg-btn
        title="Adicionar serviços"
        :icon="'mdi-plus'"
        :disabled="disableButton"
        @click="addNewEquipment"
        @keydown.enter="addNewEquipment"
        class="mt-7 ml-4" 
      />
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgBtn from "@/components/common/dsg-btn.vue";

export default {
  components: { DsgTextField, DsgBtn },
  data() {
    return {
      equipmentName: null,
      tagName: null,
      workRegime: null,
      weekRegime: null,
    };
  },
  computed: {
    disableButton() {
      if (!this.equipmentName || !this.tagName || !this.workRegime || !this.weekRegime) return true;
      return false;
    },
  },
  methods: {
    addNewEquipment() {
      let equipment = {
        equipmentName: this.equipmentName,
        tagName: this.tagName,
        workRegime: parseFloat(this.workRegime),
        weekRegime: parseFloat(this.weekRegime),
      };
      this.$router.push({
        name: "create-services",
        query: { data: JSON.stringify(equipment) },
      });
    },
  },
};
</script>

<style>
</style>