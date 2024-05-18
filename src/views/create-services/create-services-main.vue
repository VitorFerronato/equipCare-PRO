<template>
  <div>
    <v-row v-if="!editName" align="center">
      <h2>{{ equipment.equipmentName }}</h2>
      <v-icon @click="editName = true" class="ml-4">mdi-pencil-box</v-icon>
    </v-row>
    {{ equipment }}
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

    <Services-area />
  </div>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import ServicesArea from "./components/services-area.vue";
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
    };
  },

  computed: {
    equipamentsList() {
      return this.$store?.state?.equipments ?? [];
    },
  },

  methods: {
    verifyId(idParam) {
      let foundedEquipment = this.equipamentsList.filter(
        (el) => el.id == idParam
      );
      console.log(foundedEquipment);
      if (foundedEquipment) this.equipment = foundedEquipment;
    },
  },

  created() {
    let idRouteParam = this.$route.params.id.toUpperCase();
    if (!idRouteParam) this.$router.push("/list-equipments");
    this.verifyId(idRouteParam);
  },
};
</script>

<style>
</style>