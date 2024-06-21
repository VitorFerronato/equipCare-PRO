<template>
  <div>
    <v-icon @click="modalOpen = true" color="red" class="ml-4"
      >mdi-delete-outline</v-icon
    >

    <v-dialog v-model="modalOpen" max-width="500">
      <v-card class="pa-4">
        <h4 class="mb-4">EXCLUIR EQUIPAMENTO</h4>
        <p class="mb-4">
          Você deseja realmente excluir esse equipamento e todos os seus
          serviços?
          <span class="span-color">Essa ação não podera ser desfeita!</span>
        </p>

        <v-row no-gutters justify="end">
          <Dsg-btn
            :title="'Cancelar'"
            :disabled="isLoading"
            @click="modelOpen = false"
            class="mr-4"
          />
          <Dsg-btn
            :title="'Confirmar'"
            :disabled="isLoading"
            :loading="isLoading"
            @click="deleteEquipment"
          />
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import service from "@/service/create-equipment.js";
const Service = new service();

export default {
  components: { DsgBtn },
  props: ["id"],
  data: () => ({
    modalOpen: false,
    isLoading: false,
  }),
  methods: {
    async deleteEquipment() {
      this.isLoading = true;

      try {
        await Service.deleteEquipment(this.id);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao deletar equipamento!",
          type: "success",
        });
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao deletar equipamento, contate o suporte!",
          type: "error",
        });
      }
      await this.$store.dispatch("GET_EQUIPMENTS");
      this.$router.push("/list-equipments");
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.span-color {
  color: red;
}
</style>