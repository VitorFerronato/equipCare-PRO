<template>
  <v-card class="pa-4">
    <h4 class="mb-4">FILTROS</h4>
    <v-row v-if="false">
      <v-col cols="12" md="3" lg="5">
        <Dsg-text-field
          v-model="searchTerm"
          :title="'Buscar equipamentos'"
          :placeholder="'Ex: Torno multiuso'"
          :disabled="equipments.length == 0"
          @update:modelValue="search"
          append-inner-icon="mdi-magnify"
          rounded
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(filter, index) in filters" :key="index">
        <Dsg-combobox
          v-model="filter.selected"
          :title="filter.title"
          :disabled="filter.items.length <= 0 || equipmentsToTable.length == 0"
          :items="getFilterItems(filter.tag)"
          :itemTitle="'text'"
          :itemValue="'value'"
          multiple
          chips
          closable-chips
          @change="filterItems"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgCombobox from "@/components/common/dsg-combobox.vue";

export default {
  components: { DsgTextField, DsgCombobox },

  data: () => ({
    filters: [
      {
        title: "Semaforo",
        items: [],
        selected: [],
        tag: "semaphore",
      },
      {
        title: "Equipamento",
        items: [],
        selected: [],
        tag: "equipmentName",
      },
      {
        title: "Serviço",
        items: [],
        selected: [],
        tag: "serviceName",
      },
      {
        title: "Item",
        items: [],
        selected: [],
        tag: "item",
      },
      {
        title: "Categoria",
        items: [],
        selected: [],
        tag: "categorie",
      },
    ],
  }),

  computed: {
    equipmentsToTable() {
      return this.$store?.state?.listEquipments?.equipmentsToTable ?? [];
    },
  },

  watch: {
    equipmentsToTable: {
      handler(value) {
        if (value.length) {
          this.filters.forEach((f) => {
            f.items = this.getFilterItems(f.tag);
          });
        }
        this.getFilterItems();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    getFilterItems(filterTag) {
      const uniqueValues = new Set(
        this.equipmentsToTable.map((equipment) => equipment[filterTag])
      );

      return Array.from(uniqueValues).map((value) => ({ text: value, value }));
    },

    filterItems() {
      this.$store.dispatch("FILTER_ITEMS", this.filters);
    },
  },
};
</script>

<style>
</style>