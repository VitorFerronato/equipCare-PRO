<template>
  <v-card class="pa-4">
    <h4 class="mb-4">FILTROS</h4>
    <v-row>
      <v-col cols="12" md="3" lg="5">
        <Dsg-text-field
          :title="'Buscar equipamentos'"
          :placeholder="'Ex: Torno multiuso'"
          append-inner-icon="mdi-magnify"
          rounded
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Dsg-combobox :title="'Equipamento'" />
      </v-col>
      <v-col>
        <Dsg-combobox :title="'Dias'" />
      </v-col>
      <v-col>
        <Dsg-combobox :title="'Semáforo'" />
      </v-col>
      <v-col>
        <Dsg-combobox :title="'Código do produto'" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgCombobox from "@/components/common/dsg-combobox.vue";

export default {
  components: { DsgTextField, DsgCombobox },
};
</script>

<style>
</style>