<template>
  <div>
    <h2 v-if="!isModal" class="mb-4">REGISTRO DE CATEGORIAS</h2>
    <p v-if="!isModal">
      Registre as categorias que você desejar, e mais alguma descrição para
      preencher linha aqui
    </p>

    <v-card
      :loading="categoriesLoading"
      :disabled="categoriesLoading"
      :elevation="isModal ? '0' : '10'"
      class="pa-4 mt-6"
    >
      <h4 v-if="!isModal">CATEGORIAS REGISTRADAS</h4>
      <Dsg-btn
        title="Novo item"
        :icon="'mdi-plus'"
        @click="addNewItem"
        class="my-4"
      />

      <v-data-table
        :headers="headers"
        :items="categories"
        :hide-default-footer="categories.length <= 5"
      >
        <template v-slot:[`item.categorie`]="{ item }">
          <div>
            <span v-if="!item.isEdit">{{ item.categorie.toUpperCase() }}</span>
            <Dsg-text-field v-else v-model="item.categorie" />
          </div>
        </template>
        <template v-slot:[`item.observation`]="{ item }">
          <div>
            <span v-if="!item.isEdit">{{
              item.observation.toUpperCase()
            }}</span>
            <Dsg-text-field v-else v-model="item.observation" />
          </div>
        </template>

        <template v-slot:[`item.isEdit`]="{ item, index }">
          <div>
            <v-icon
              color="#12192c"
              v-if="!item.isEdit"
              @click="item.isEdit = true"
              size="30"
              >mdi-pencil-box-outline
            </v-icon>
            <div v-else>
              <v-icon
                :disabled="verifyMandatoryFields(item)"
                @click="updateCategorie(item)"
                color="#1D8527"
                size="30"
                >mdi-checkbox-marked</v-icon
              >
              <v-icon
                @click="deleteCategorie(item, index)"
                color="#B00020"
                size="30"
                >mdi-delete-outline</v-icon
              >
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DsgBtn from "@/components/common/dsg-btn.vue";
import DsgTextField from "@/components/common/dsg-text-field.vue";
export default {
  components: { DsgBtn, DsgTextField },
  props: {
    isModal: {
      default: false,
      type: Boolean,
    },
  },
  name: "categories-register",
  data: () => ({
    isLoading: false,
    loadingTable: false,
    headers: [
      {
        title: "Categoria",
        value: "categorie",
        sortable: true,
      },
      {
        title: "Observação",
        value: "observation",
        sortable: true,
      },
      {
        title: "Editar / Excluir",
        value: "isEdit",
        sortable: true,
      },
    ],
  }),

  computed: {
    categories() {
      return this.$store?.state?.categories?.categories ?? [];
    },

    categoriesLoading() {
      return this.$store?.state?.getCategoriesLoading ?? false;
    },
  },

  methods: {
    async updateCategorie(categorie) {
      if (!categorie.id) {
        this.createNewCategorie(categorie);
        return;
      }

      this.loadingTable = true;

      categorie.isEdit = false;

      await this.$store.dispatch("UPDATE_CATEGORIE", categorie);

      this.loadingTable = false;
    },

    async createNewCategorie(categorie) {
      this.loadingTable = true;

      categorie.isEdit = false;

      await this.$store.dispatch("CREATE_NEW_CATEGORIE", categorie);

      this.loadingTable = false;
    },

    async deleteCategorie(categorie, index) {
      if (!categorie.id) {
        this.categories.splice(index, 1);
        return;
      }

      this.loadingTable = true;

      await this.$store.dispatch("DELETE_CATEGORIE", categorie.id);
      categorie.isEdit = false;

      this.loadingTable = false;
    },

    verifyMandatoryFields(categorie) {
      if (!categorie.categorie || categorie.categorie == "") return true;

      return false;
    },

    addNewItem() {
      this.categories.unshift({
        categorie: "",
        observation: "",
        isEdit: true,
      });
    },
  },
};
</script>

<style>
</style>