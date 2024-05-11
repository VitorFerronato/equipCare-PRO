<template>
    <v-card class="pa-4">
        <v-row>
          <v-col cols="12" md="3" lg="4">
            <Dsg-text-field
              v-model="equipment"
              :title="'Criar equipamento'"
              :appendIcon="'mdi-plus-box'"
              @append="addNewEquipment"
              @keydown.enter="addNewEquipment"
            />
          </v-col>
        </v-row>
    </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import { mapMutations } from "vuex";

export default {
  components: { DsgTextField },
  data() {
    return {
      equipment: null,
    };
  },
  methods: {
    ...mapMutations(["ADD_EQUIPMENT"]),

    addNewEquipment() {
      this.ADD_EQUIPMENT(this.equipment);
    },
  },
};
</script>

<style>
</style>