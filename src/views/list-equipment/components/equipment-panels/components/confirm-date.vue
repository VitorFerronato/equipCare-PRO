<template>
  <v-dialog v-model="isOpen" width="350" persistent>
    <v-card class="pa-4">
      <h4 class="mb-4">REALIZAR MANUTENÇÃO</h4>
      <label>Escolha o dia que foi feito a manutenção</label>
      <v-row no-gutters justify="space-around" class="mt-2">
        <v-date-picker
          v-model="selectedDate"
          color="primary"
          hide-header
          rounded
        ></v-date-picker>
      </v-row>
      <v-row no-gutters justify="end">
        <Dsg-btn :title="'Cancelar'" @click="$emit('closeModal')" class="mr-4" />
        <Dsg-btn :title="'Confirmar'" @click="setDateRealized" />
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
export default {
  components: { DsgBtn },
  props: ["modalOpen"],
  data: () => ({
    isOpen: false,
    selectedDate: null,
  }),
  methods: {
    setDateRealized() {
      console.log(this.selectedDate);
    },
  },
  watch: {
    modalOpen() {
      this.isOpen = this.modalOpen;
    },
  },
};
</script>

<style>
</style>