<template>
  <div>
    <v-icon size="30" @click="modalOpen = true"> mdi-plus-box </v-icon>

    <v-dialog v-model="modalOpen" v-if="modalOpen" width="1100">
      <v-card class="pa-4">
        <v-row no-gutters justify="space-between" align="center">
          <h4>ADICIONAR {{ title }}</h4>
          <v-icon @click="modalOpen = false">mdi-close</v-icon>
        </v-row>
        <Items-register-main
          v-if="type == 'item'"
          :isModal="true"
        />
        <Categories-register-main
          v-if="type == 'categorie'"
          :isModal="true"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ItemsRegisterMain from "@/views/items-register/items-register-main.vue";
import CategoriesRegisterMain from "@/views/categories-register/categories-register-main.vue";

export default {
  props: {
    type: {
      type: String,
    },
  },
  components: { ItemsRegisterMain, CategoriesRegisterMain },

  data: () => ({
    modalOpen: false,
  }),

  computed: {
    title() {
      return this.type == "item" ? "ITEMS" : "CATEGORIAS";
    },
  },
};
</script>

<style>
</style>