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
      @deleteService="deleteService"
      @setNewService="setNewService"
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
    servicesNew: [],
    items: [],
    categories: [],
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
      this.servicesNew.splice(index, 1, service);
    },

    saveEquipment() {
      let mountServices = this.buildRequest(this.services);
      this.$emit("setServices", mountServices);
    },

    buildRequest(services) {
      return services.map((service) => ({
        serviceName: service.serviceName,
        workHours: service.daysUsed,
        daysUsed: service.daysUsed,
        dateInterval: 800,
        nextMaintence: "22/08/2024 - 15:00",
        semaphore: 0,
        realized: 1,
      }));
    },

    addNewService() {
      this.localServices.unshift({
        serviceName: null,
        workHours: null,
        daysUsed: null,
        dateInterval: null,
        nextMaintence: null,
      });
    },

    deleteService(index) {
      this.servicesNew.splice(index, 1);
      this.localServices.splice(index, 1);
    },
  },

  created() {
    this.getCategories();
    this.getItems();
  },
};
</script>

<style lang="scss" scoped>
</style>