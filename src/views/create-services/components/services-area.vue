<template>
  <div class="mt-4">
    <Dsg-btn :title="'Adicionar serviço'" />

    <v-card class="pa-4 mt-4">
      <v-row align="center">
        <v-col cols="12" md="5" lg="8">
          <Dsg-text-field :title="'Nome do serviço'" />
        </v-col>

        <div class="mt-5">
          <p>Próxima manutenção</p>
          <p>22/08/2024 - 15:00</p>
        </div>
      </v-row>
      <v-row>
        <v-col>
          <Dsg-text-field :title="'Intevalo de manutenção'" :tooltipText="'Alguma explicação'"/>
        </v-col>
        <v-col>
          <Dsg-text-field :title="'Horas de uso'" />
        </v-col>
        <v-col>
          <Dsg-text-field :title="'Dias de uso'" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import DsgTextField from "@/components/common/dsg-text-field.vue";
export default {
  components: { DsgBtn, DsgTextField },
};
</script>

<style lang="scss" scoped>
</style>