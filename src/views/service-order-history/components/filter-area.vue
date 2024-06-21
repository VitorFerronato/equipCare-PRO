<template>
  <v-card class="pa-4">
    <h4 class="mb-4">FILTROS</h4>

    <v-row>
      <v-col v-for="(filter, index) in filters" :key="index">
        <Dsg-combobox
          v-model="filter.selected"
          :title="filter.title"
          :disabled="filter.items.length <= 0 || equipments.length == 0"
          :items="filter.items"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DsgCombobox from "@/components/common/dsg-combobox.vue";

export default {
  components: { DsgCombobox },

  data: () => ({
    filters: [
      {
        title: "Categoria",
        items: [],
        selected: null,
      },
      {
        title: "Items",
        items: [],
        selected: null,
      },
      {
        title: "Semáforo",
        items: [],
        selected: null,
      },
    ],
    searchTerm: "",
  }),

  computed: {
    equipments() {
      return this.$store?.state?.equipments ?? [];
    },
  },

  watch: {
    equipments: {
      handler(value) {
        if (!value || value.length <= 0) return;
        this.setFilterItems();
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    setFilterItems() {},
  },
};
</script>

<style>
</style>