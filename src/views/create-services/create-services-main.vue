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

    <v-row v-if="!editName" align="center">
      <h2>{{ equipmentName }}</h2>
      <v-icon @click="editName = true" class="ml-4">mdi-pencil-box</v-icon>
    </v-row>
    <v-row v-if="editName">
      <v-col cols="12" md="4" lg="6">
        <Dsg-text-field />
      </v-col>

      <div class="mt-5">
        <v-icon @click="editName = false"> mdi-checkbox-marked </v-icon>
        <v-icon> mdi-close-box </v-icon>
      </div>
    </v-row>

    <v-breadcrumbs :items="breadCrumbs" divider="-"></v-breadcrumbs>

    <Services-area :services="services" />
  </div>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import ServicesArea from "./components/services-area.vue";
import service from "@/service/create-equipment.js";
const Service = new service();
export default {
  components: { DsgTextField, ServicesArea },
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
      editName: false,
      equipment: null,
      isLoading: false,
    };
  },

  computed: {
    equipamentsList() {
      return this.$store?.state?.equipments ?? [];
    },
    equipmentName() {
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
        console.log(response);
        this.equipment = response?.data ?? null;
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
  },

  async created() {
    let idRouteParam = this.$route.params.id;
    let type = this.$route.params.type;

    if (!idRouteParam) {
      this.$router.push("/list-equipments");
      return;
    }

    if (type == "new") this.equipment = idRouteParam;
    else this.getEquipmentByID(idRouteParam);
  },
};
</script>

<style>
</style>