<template>
  <v-card class="pa-4">
    <h4 class="mb-4">FILTROS</h4>
    <v-row>
      <v-col cols="12" md="3" lg="5">
        <Dsg-text-field
          v-model="searchTerm"
          :title="'Buscar equipamentos'"
          :placeholder="'Ex: Torno multiuso'"
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
          :disabled="filter.items.length <= 0"
          :items="filter.items"
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
        title: "Dias",
        items: [],
        selected: null,
      },
      {
        title: "Semáforo",
        items: [],
        selected: null,
      },
      {
        title: "Código do produto",
        items: [],
        selected: null,
      },
      {
        title: "Realizado",
        items: [
          {
            text: "Realizado",
            value: 0,
          },
          {
            text: "Não realizado",
            value: 1,
          },
        ],
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
    search() {
      this.$store.dispatch("FILTER_ITEMS", this.searchTerm);
    },

    setFilterItems() {},
  },
};
</script>

<style>
</style>