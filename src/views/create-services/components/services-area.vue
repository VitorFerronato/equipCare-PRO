<template>
  <div >
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
      @deleteService="deleteService"
      @setNewService="setNewService"
    />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import ServiceCard from "./service-card.vue";

export default {
  components: { DsgBtn, ServiceCard },
  props: ["services"],
  data: () => ({
    localServices: [],
    servicesNew: [],
  }),

  computed: {
    newServices() {
      return this.$store?.state?.services ?? [];
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
};
</script>

<style lang="scss" scoped>
</style>