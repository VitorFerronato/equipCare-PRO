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

    <h2>{{ equipmentName }}</h2>

    <v-breadcrumbs
      :items="breadCrumbs"
      divider="/"
      class="pl-6 pt-0"
    ></v-breadcrumbs>

    <Services-area :services="services" />
  </div>
</template>

<script>
import ServicesArea from "./components/services-area.vue";
import service from "@/service/create-equipment.js";
const Service = new service();
export default {
  components: { ServicesArea },
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