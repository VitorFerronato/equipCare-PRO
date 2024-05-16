<template>
  <v-row no-gutters justify="space-between" align="end">
    <div class="semaphore mt-6">
      <div class="red-border">Equipamentos com no dia da manutenção ou vencidos</div>
      <div class="yellow-border">Equipamentos com manutenção em 5 dias</div>
      <div class="orange-border">Equipamentos com manutenção em 15 dias</div>
      <div class="green-border">Equipamentos com manutenção em 30 dias  </div>
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