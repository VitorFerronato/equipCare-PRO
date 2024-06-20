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
    <v-row align="center" class="mb-2">
      <h2>
        {{ equipmentName }}
        <span v-show="tagName">- {{ tagName }}</span>
      </h2>

      <Delete-equipment-modal :id="equipmentId" />
    </v-row>

    <div class="dsg-flex-center gap-1 mb-6">
      <div>
        <span class="font-weight-bold">Regime de trabalho: </span>
        <span
          >{{ workRegime }} Horas por dia {{ weekRegime }} dias por semana</span
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
import DeleteEquipmentModal from "./components/delete-equipment.modal.vue";
const Service = new service();
export default {
  components: { ServicesArea, DeleteEquipmentModal },
  name: "create-services",
  data() {
    return {
      isLoading: false,

      equipment: null,
      tag: null,
    };
  },

  computed: {
    services() {
      return this.equipment?.services ?? [];
    },

    equipmentId() {
      return this.equipment?.id ?? null;
    },

    equipmentName() {
      console.log(this.equipment);
      return this.equipment?.equipmentName.toUpperCase() ?? "-";
    },

    tagName() {
      return this.equipment?.tagName.toUpperCase() ?? "-";
    },

    weekRegime() {
      return this.equipment?.weekRegime ?? null;
    },

    workRegime() {
      return this.equipment?.workRegime ?? null;
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
        await this.$store.dispatch("GET_EQUIPMENTS");
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
  },

  async created() {
    if (!this.$route.query.data) this.$router.push("list-equipment");

    let id = JSON.parse(this.$route.query.data).id;

    if (id) this.getEquipmentByID(id);
    else this.equipment = JSON.parse(this.$route.query.data);
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