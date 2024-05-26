<template>
  <v-card class="pa-4">
    <v-row class="mb-4">
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
    <Dsg-btn
      title="Criar"
      :icon="'mdi-plus'"
      :disabled="disableButton"
      @click="addNewEquipment"
      @keydown.enter="addNewEquipment"
    />
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
    };
  },
  computed: {
    disableButton() {
      if (!this.equipmentName || !this.tagName) return true;
      return false;
    },
  },
  methods: {
    addNewEquipment() {
      this.$router.push(
        `create-services/new/${this.equipmentName}/${this.tagName}`
      );
    },
  },
};
</script>

<style>
</style>