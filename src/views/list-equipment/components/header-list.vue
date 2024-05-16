<template>
  <v-row no-gutters justify="space-between" align="end">
    <div class="semaphore mt-6">
      <div class="green-border">Equipamentos longe da data de manutenção</div>
      <div class="blue-border">Equipamentos próximas da data de manutenção</div>
      <div class="yellow-border">Equipamentos com vencimento hoje</div>
      <div class="red-border">Equipamentos vencidos</div>
    </div>
    <Dsg-btn :title="'Extraír relatório'" />
  </v-row>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";

export default {
  components: { DsgBtn },
};
</script>

<style>
</style>