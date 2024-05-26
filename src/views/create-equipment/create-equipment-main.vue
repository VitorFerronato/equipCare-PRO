<template>
  <div>
    <h2 class="mb-4">CRIAR NOVO EQUIPAMENTO</h2>

    <p class="mb-6">
      Criar novo equipamento, aqui vai alguma outra descrição sobre o que essa
      tela faz
    </p>

    <New-equipment />
  </div>
</template>

<script>
import NewEquipment from "./components/new-equipment.vue";

export default {
  components: { NewEquipment },
  name: "create-equipment",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>