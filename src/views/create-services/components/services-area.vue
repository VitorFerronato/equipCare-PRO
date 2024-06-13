<template>
  <div>
    <Dsg-btn
      :title="'Adicionar serviço'"
      :icon="'mdi-plus'"
      @click="addNewService"
      class="mr-4"
    />

    <Dsg-btn :title="'salvar'" @click="saveEquipment" />

    <Service-card
      v-for="(service, index) in localServices"
      :key="index"
      :service="service"
      :index="index"
      :items="items"
      :categories="categories"
      :workRegime="workRegime"
      :weekRegime="weekRegime"
      @deleteService="deleteService"
      @setNewService="setNewService"
      @updateItems="getItems"
      @updateCategories="getCategories"
    />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import ServiceCard from "./service-card.vue";
import itemService from "@/service/items-area.js";
const ItemService = new itemService();
import categorieService from "@/service/categories-area.js";
const CategorieService = new categorieService();

export default {
  components: { DsgBtn, ServiceCard },
  props: ["services"],
  data: () => ({
    localServices: [],
    servicesCreated: [],
    items: [],
    categories: [],
    workRegime: null,
    weekRegime: null,
    isLoading: false,
  }),

  watch: {
    services: {
      handler(value) {
        this.localServices = value;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    async getItems() {
      this.isLoading = true;

      try {
        let response = await ItemService.getItems();
        this.items = response?.data ?? [];
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },

    async getCategories() {
      this.isLoading = true;

      try {
        let response = await CategorieService.getCategories();
        this.categories = response?.data ?? [];
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },

    setNewService(service, index) {
      this.servicesCreated.splice(index, 1, service);
    },

    saveEquipment() {
      let hasNullProperty = this.hasInvalidProperty(this.servicesCreated);

      if (hasNullProperty) {
        this.$store.commit("snackbar/set", {
          message: "Propriedades faltando, verifique!",
          type: "error",
        });
        return;
      }

      let serviceRequest = this.buildRequest(this.servicesCreated);
      this.$emit("setServices", serviceRequest);
    },

    hasInvalidProperty(arr) {
      return arr.some((obj) => {
        return Object.keys(obj).some((key) => {
          if (
            key !== "manualDate" &&
            (obj[key] === null || obj[key] === "" || obj[key] === undefined)
          ) {
            return true;
          }
          return false;
        });
      });
    },

    buildRequest(services) {
      return services.map((service) => ({
        serviceName: service.serviceName,
        item: service.item,
        categorie: service.categorie,
        changePeriod: parseFloat(service.changePeriod),
        lastMaintence: service.date,
        nextMaintence: service.manualDate
          ? service.manualDate
          : service.proximaManutencao,
        workRegime: parseFloat(this.workRegime),
        weekRegime: parseFloat(this.weekRegime),
        semaphore: 0,
        realized: 1,
        idService: service.id ? service.id : Math.floor(Math.random() * 1000),
      }));
    },

    addNewService() {
      this.localServices.push({
        serviceName: null,
        item: null,
        categorie: null,
      });
    },

    deleteService(index) {
      this.servicesCreated.splice(index, 1);
      this.localServices.splice(index, 1);
    },
  },

  created() {
    let equipment = JSON.parse(this.$route.query.data);
    this.workRegime = parseFloat(equipment.workRegime);
    this.weekRegime = parseFloat(equipment.weekRegime);
    this.getCategories();
    this.getItems();
  },
};
</script>

<style lang="scss" scoped>
</style>