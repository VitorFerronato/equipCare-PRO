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
          :items="equipamentsList"
          :itemTitle="'equipmentName'"
          :itemValue="'id'"
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
    };
  },
  computed: {
    equipamentsList() {
      return this.$store?.state?.equipments ?? [];
    },
  },
  methods: {
    addNewEquipment(event, editEquipment) {
      if (editEquipment)
        this.$router.push(`create-services/${event?.id ?? null}`);
      else this.$router.push(`create-services/${this.newEquipment}`);
    },

    async getEquipmentsNames() {
      try {
        let response = await Service.getEquipmentNames();
        console.log("data", response);
      } catch (error) {
        console.log(error);
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