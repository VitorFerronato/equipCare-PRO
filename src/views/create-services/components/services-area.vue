<template>
  <div class="mt-4">
    <Dsg-btn
      :title="'Adicionar serviço'"
      :icon="'mdi-plus'"
      @click="addNewService"
      class="mr-4"
    />
    <Dsg-btn :title="'salvar'" @click="saveEquipment" />

    <Service-card
      v-for="(service, index) in services"
      :key="index"
      :service="service"
      :index="index"
      @saveService="saveService"
      @deleteService="deleteService"
    />
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import ServiceCard from "./service-card.vue";
export default {
  components: { DsgBtn, ServiceCard },
  data() {
    return {
      services: [
        {
          serviceName: null,
          dateInterval: null,
          workHours: null,
          daysUsed: null,
          nextMaintenance: null,
        },
      ],
    };
  },

  methods: {
    addNewService() {
      this.services.push({
        serviceName: null,
        dateInterval: null,
        workHours: null,
        daysUsed: null,
        nextMaintenance: null,
      });
    },

    saveService(service, index) {
      Object.assign(this.services[index], service);
    },

    deleteService(index) {
      this.services.splice(index, 1);
    },

    saveEquipment() {
      // envia os dados preenchidos
      console.log(this.services);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>