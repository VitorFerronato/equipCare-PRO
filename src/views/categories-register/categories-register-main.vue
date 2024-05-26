<template>
  <div>
    <h2 class="mb-4">REGISTRO DE CATEGORIAS</h2>
    <p>
      Registre as categorias que você desejar, e mais alguma descrição para
      preencher linha aqui
    </p>

    <v-card class="pa-4 mt-6">
      <h4>CATEGORIAS REGISTRADAS</h4>
      <Dsg-btn
        title="Novo item"
        :icon="'mdi-plus'"
        @click="addNewItem"
        class="my-4"
      />
      <v-data-table :headers="headers" :items="items">
        <template v-slot:[`item.categorie`]="{ item }">
          <div>
            <span v-if="!item.isEdit">{{ item.categorie }}</span>
            <Dsg-text-field v-else v-model="item.categorie" />
          </div>
        </template>
        <template v-slot:[`item.observation`]="{ item }">
          <div>
            <span v-if="!item.isEdit">{{ item.observation }}</span>
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
import service from "@/service/categories-area";
import DsgTextField from "@/components/common/dsg-text-field.vue";
const Service = new service();
export default {
  components: { DsgBtn, DsgTextField },
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
    items: [],
  }),

  methods: {
    async getCategories() {
      this.isLoading = true;

      try {
        let response = await Service.getCategories();
        this.items = response?.data ?? [];
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao buscar categorias, contate o suporte!",
          type: "error",
        });
        this.items = [];
      }
      this.isLoading = false;
    },

    async createNewCategorie(categorie) {
      this.loadingTable = true;

      categorie.id = Date.now();
      categorie.isEdit = false;

      try {
        await Service.createCategorie(categorie);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao adicionar categoria",
          type: "success",
        });
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao adicionar categoria, contate o suporte!",
          type: "error",
        });
        this.getCategories();
      }

      this.loadingTable = false;
    },

    async updateCategorie(categorie) {
      if (!categorie.id) {
        this.createNewCategorie(categorie);
        return;
      }

      this.loadingTable = true;
      categorie.isEdit = false;

      try {
        await Service.updateCategorie(categorie);
        this.$store.commit("snackbar/set", {
          message: "Sucesso editar categoria",
          type: "success",
        });
      } catch (error) {
        this.$store.commit("snackbar/set", {
          message: "Erro ao editar categoria, contate o suporte!",
          type: "error",
        });
        this.getCategories();
      }

      this.loadingTable = false;
    },

    async deleteCategorie(categorie, index) {
      if (!categorie.id) {
        this.items.splice(index, 1);
        return;
      }

      this.loadingTable = true;

      try {
        await Service.deleteCategorie(categorie.id);
        this.items = this.items.filter((el) => el.id !== categorie.id);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao excluir categoria!",
          type: "success",
        });
      } catch (error) {
        this.$store.commit("snackbar/set", {
          message: "Erro ao excluir categoria, contate o suporte!",
          type: "error",
        });
        this.getCategories();
      }

      this.loadingTable = false;
      categorie.isEdit = false;
    },

    verifyMandatoryFields(categorie) {
      if (!categorie.categorie || categorie.categorie == "") return true;

      return false;
    },

    addNewItem() {
      this.items.unshift({
        categorie: "",
        observation: "",
        isEdit: true,
      });
    },
  },

  created() {
    this.getCategories();
  },
};
</script>

<style>
</style>