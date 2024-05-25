<template>
  <div>
    <v-row no-gutters justify="space-between" align="center" class="mb-6">
      <h2 >CRIAR EQUIPAMENTO</h2>
      <router-link to="/list-equipments">
        <Dsg-btn :title="'Voltar'" :icon="'mdi-arrow-left'" />
      </router-link>
    </v-row>
    <New-equipment />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import NewEquipment from "./components/new-equipment.vue";

export default {
  components: { NewEquipment, DsgBtn },
  name: "create-equipment",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>