<template>
  <div>
    <v-overlay
      :model-value="isLoading"
      scrim="white"
      persistent
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <h2 class="mb-2">
      {{ equipment.equipmentName.toUpperCase() }}
      <span v-show="equipment.tagName">- {{ equipment.tagName }}</span>
    </h2>

    <div class="dsg-flex-center gap-1 mb-6">
      <div>
        <span class="font-weight-bold">Regime de trabalho: </span>
        <span
          >{{ equipment.workRegime }} Horas por dia
          {{ equipment.weekRegime }} dias por semana</span
        >
      </div>
    </div>
    <Services-area
      :services="services"
      :workRegime="workRegime"
      :weekRegime="weekRegime"
      @setServices="saveService"
    />
  </div>
</template>

<script>
import ServicesArea from "./components/services-area.vue";
import service from "@/service/create-equipment.js";
const Service = new service();
export default {
  props: ["workRegime", "weekRegime"],
  components: { ServicesArea },
  name: "create-services",
  data() {
    return {
      isLoading: false,

      equipment: null,
      tag: null,

      newItem: false,
    };
  },

  computed: {
    services() {
      return this.equipment?.services ?? [];
    },
  },

  methods: {
    async getEquipmentByID(id) {
      this.isLoading = true;

      try {
        let response = await Service.getEquipmentByID(id);
        this.equipment = response?.data ?? null;
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao buscar serviços, contate o suporte!",
          type: "error",
        });
        this.$router.push("/list-equipments");
      }

      this.isLoading = false;
    },

    async saveService(services) {
      this.isLoading = true;

      let request = {
        equipmentName: this.equipment?.equipmentName ?? "-",
        weekRegime: this.equipment?.weekRegime ?? "-",
        workRegime: this.equipment?.workRegime ?? "-",
        tagName: this.equipment?.tagName ?? "-",
        semaphore: 0, // Sera feito o semáforo no back
        id: this.equipment.id
          ? this.equipment.id
          : Math.floor(Math.random() * 1000), // Id também gerado no back
        services: services,
      };

      let serviceURL = this.equipment.id
        ? "updateEquipment"
        : "saveNewEquipment";
      try {
        await Service[serviceURL](request);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao salvar equipamento",
          type: "success",
        });
        this.$router.push("/list-equipments");
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao salvar equipamento",
          type: "error",
        });
      }
      this.isLoading = false;
    },

    verifyEquipment(id, type) {
      if (type == "new") {
        this.newItem = true;
        this.equipment = id;
      } else {
        this.getEquipmentByID(id);
        this.newItem = false;
      }
    },
  },

  async created() {
    if (this.$route.query.data) {
      this.equipment = JSON.parse(this.$route.query.data);
    }
  },
};
</script>

<style lang="scss" scoped>
.equipment-details {
  background-color: #cccccc60;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>