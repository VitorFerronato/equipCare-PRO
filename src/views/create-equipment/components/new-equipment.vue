<template>
  <v-card class="pa-4">
    <v-row>
      <v-col cols="12" md="3" lg="4">
        <Dsg-text-field
          v-model="newEquipment"
          :title="'Criar equipamento'"
          :appendIcon="'mdi-plus-box'"
          @append="addNewEquipment($event)"
          @keydown.enter="addNewEquipment($event)"
        />
      </v-col>

      <v-col cols="12" md="3" lg="4">
        <Dsg-combobox
          :title="'Editar equipamento'"
          :items="equipamentsList"
          @change="addNewEquipment($event, true)"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgCombobox from "@/components/common/dsg-combobox.vue";

export default {
  components: { DsgTextField, DsgCombobox },
  data() {
    return {
      newEquipment: null,
      equipamentsList: [
        {
          text: "Torno 2012 tatata",
          id: 21474,
        },
        {
          text: "Fresa 404 tototo",
          id: 181,
        },
      ],
    };
  },
  methods: {
    addNewEquipment(event, editEquipment) {
      if (editEquipment)
        this.$router.push(`create-services/${event?.id ?? null}`);
      else this.$router.push(`create-services/${this.newEquipment}`);
    },
  },
};
</script>

<style>
</style>