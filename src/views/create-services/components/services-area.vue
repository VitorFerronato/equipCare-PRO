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
    />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import ServiceCard from "./service-card.vue";
import moment from "moment";
export default {
  components: { DsgBtn, ServiceCard },
  props: ["services", "workRegime", "weekRegime"],
  data: () => ({
    localServices: [],
    servicesCreated: [],

    isLoading: false,
  }),

  computed: {
    items() {
      return this.$store?.state?.items ?? [];
    },
    categories() {
      return this.$store?.state?.categories ?? [];
    },
  },

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
        if (obj.serviceOrder !== null && obj.nextMaintence === null) {
          return false;
        }

        return Object.keys(obj).some((key) => {
          if (
            key !== "manualDate" &&
            key !== "serviceOrder" &&
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
        item: service.item.itemName ? service.item.itemName : service.item,
        categorie: service.categorie.categorie
          ? service.categorie.categorie
          : service.categorie,
        changePeriod: parseFloat(service.changePeriod),
        lastMaintence: service.lastMaintence,
        nextMaintence: service.serviceOrder
          ? null
          : service.manualDate
          ? service.manualDate
          : service.proximaManutencao,
        workRegime: parseFloat(this.workRegime),
        weekRegime: parseFloat(this.weekRegime),
        semaphore: service?.serviceOrder
          ? 4
          : service.manualDate
          ? this.resolveSemaphore(service.manualDate, service.lastMaintence)
          : this.resolveSemaphore(
              service.proximaManutencao,
              service.lastMaintence
            ),
        realized: false,
        serviceOrder: service?.serviceOrder ?? null,
        serviceId: service.id ? service.id : Math.floor(Math.random() * 1000),
      }));
    },

    resolveSemaphore(nextMaintence, lastMaintence) {
      const data1 = moment(lastMaintence, "DD/MM/YYYY");
      const data2 = moment(nextMaintence, "DD/MM/YYYY");

      return this.setSemaphore(data2.diff(data1, "days"));
    },

    setSemaphore(days) {
      if (days <= 0) {
        return 0;
      } else if (days <= 5) {
        return 1;
      } else if (days <= 15) {
        return 2;
      } else {
        return 3;
      }
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
};
</script>

<style lang="scss" scoped>
</style>