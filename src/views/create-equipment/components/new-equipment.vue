<template>
  <v-card class="pa-4">
    <v-row>
      <v-col cols="12" md="3" lg="4">
        <Dsg-text-field
          v-model="newEquipment"
          :title="'Criar equipamento'"
          :appendIcon="'mdi-plus-box'"
          placeholder="Digite o nome do equipamento"
          @append="addNewEquipment($event)"
          @keydown.enter="addNewEquipment($event)"
        />
      </v-col>

      <v-col cols="12" md="3" lg="4">
        <Dsg-combobox
          :title="'Editar equipamento'"
          :items="equipmentList"
          :itemTitle="'equipmentName'"
          :itemValue="'id'"
          :loading="isLoading"
          :disabled="isLoading || equipmentList.length == 0"
          @change="addNewEquipment($event, true)"
          placeholder="Escolha um equipamento"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgCombobox from "@/components/common/dsg-combobox.vue";
import service from "@/service/create-equipment.js";
const Service = new service();
export default {
  components: { DsgTextField, DsgCombobox },
  data() {
    return {
      newEquipment: null,
      equipmentList: [],
      isLoading: false,
    };
  },
  methods: {
    async getEquipmentsNames() {
      this.isLoading = true;

      try {
        let response = await Service.getEquipmentNames();
        this.equipmentList = response?.data ?? [];
      } catch (error) {
        this.$store.commit("snackbar/set", {
          message: "Erro ao buscar equipamentos, contate o suporte!",
          type: "error",
        });
        console.log(error);
        this.equipmentList = [];
      }

      this.isLoading = false;
    },

    addNewEquipment(event, editEquipment) {
      if (editEquipment) {
        const id = parseFloat(event?.id);
        if (!isNaN(id)) {
          this.$router.push(`create-services/existent/${id}`);
        }
      } else {
        this.$router.push(`create-services/new/${this.newEquipment}`);
      }
    },
  },

  created() {
    this.getEquipmentsNames();
  },
};
</script>

<style>
</style>