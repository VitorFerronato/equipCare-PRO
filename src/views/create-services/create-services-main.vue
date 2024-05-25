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

    <v-row no-gutters justify="space-between" align="end">
      <h2>{{ equipmentName }}</h2>
      <router-link to="/create-equipment">
        <Dsg-btn :title="'Voltar'" :icon="'mdi-arrow-left'" />
      </router-link>
    </v-row>

    <v-breadcrumbs
      :items="breadCrumbs"
      divider="/"
      class="pl-6 pt-0"
    ></v-breadcrumbs>

    <Services-area :services="services" @setServices="saveService" />
  </div>
</template>

<script>
import ServicesArea from "./components/services-area.vue";
import service from "@/service/create-equipment.js";
import DsgBtn from "@/components/common/dsg-btn.vue";
const Service = new service();
export default {
  components: { ServicesArea, DsgBtn },
  name: "create-services",
  data() {
    return {
      breadCrumbs: [
        {
          title: "Criar equipamento",
          href: "/create-equipment",
        },
        {
          title: "Criar serviços",
          href: "create-services",
        },
      ],
      isLoading: false,

      equipment: null,

      newItem: false,
    };
  },

  computed: {
    equipmentName() {
      if (this.newItem) return this.equipment.toUpperCase();

      return this.equipment?.equipmentName ?? "-";
    },

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
      let request = {
        equipmentName: this.equipmentName,
        semaphore: 0,
        id: Math.floor(Math.random() * 1000),
        services: services,
      };

      try {
        let response = await Service.saveNewEquipment(request);
        console.log("resposta do back", response);
      } catch (error) {
        console.log(error);
      }
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

    editNameFunc() {},
  },

  async created() {
    let idRouteParam = this.$route.params.id;
    let type = this.$route.params.type;

    if (!idRouteParam) {
      this.$router.push("/list-equipments");
      return;
    }

    this.verifyEquipment(idRouteParam, type);
  },
};
</script>

<style>
</style>