<template>
  <div>
    <h2 class="mb-4">REGISTRO DE ITEMS</h2>
    <p>
      Registre os items que você desejar, e mais alguma descrição para preencher
      linha aqui
    </p>

    <v-card class="pa-4 mt-6">
      <h4>ITEMS REGISTADOS</h4>
      <Dsg-loading-circular v-if="isLoading" class="mt-6" />

      <div v-else>
        <Dsg-btn
          title="Novo item"
          :icon="'mdi-plus'"
          @click="addNewItem"
          class="my-4"
        />
        <v-data-table :items="items" :headers="headers">
          <template v-slot:[`item.itemName`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{ item.itemName.toUpperCase() }}</span>
              <Dsg-text-field v-else v-model="item.itemName" />
            </div>
          </template>

          <template v-slot:[`item.cod`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{ item.cod }}</span>
              <Dsg-text-field v-else v-model="item.cod" />
            </div>
          </template>

          <template v-slot:[`item.observation`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{
                item.observation ? item.observation : "-"
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
                  @click="updateItem(item)"
                  color="#1D8527"
                  size="30"
                  >mdi-checkbox-marked</v-icon
                >
                <v-icon
                  @click="deleteItem(item, index)"
                  color="#B00020"
                  size="30"
                  >mdi-delete-outline</v-icon
                >
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import DsgTextField from "@/components/common/dsg-text-field.vue";
import DsgBtn from "@/components/common/dsg-btn.vue";
import service from "@/service/items-area.js";
import DsgLoadingCircular from "@/components/common/dsg-loading-circular.vue";
const Service = new service();
export default {
  components: { DsgTextField, DsgBtn, DsgLoadingCircular },
  name: "items-register",
  data: () => ({
    isLoading: false,
    loadingTable: false,

    headers: [
      {
        title: "Item",
        value: "itemName",
        sortable: true,
        minWidth: "300",
      },
      {
        title: "Código",
        value: "cod",
        sortable: true,
        minWidth: "200",
      },
      {
        title: "Observação",
        value: "observation",
        sortable: true,
        minWidth: "400",
      },
      {
        title: "Editar/Excluir",
        value: "isEdit",
        sortable: true,
        minWidth: "100",
      },
    ],

    items: [],
  }),

  _methods: {
    async getItems() {
      this.isLoading = true;

      try {
        let response = await Service.getItems();
        this.items = response?.data ?? [];
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao buscar items, contate o suporte!",
          type: "error",
        });
        this.items = [];
      }
      this.isLoading = false;
    },

    async updateItem(item) {
      if (!item.id) {
        this.createNewItem(item);
        return;
      }

      this.loadingTable = true;
      item.isEdit = false;

      try {
        await Service.updateItem(item);
        this.$store.commit("snackbar/set", {
          message: "Sucesso editar item",
          type: "success",
        });
      } catch (error) {
        this.$store.commit("snackbar/set", {
          message: "Erro ao editar item, contate o suporte!",
          type: "error",
        });
        this.getItems();
      }

      this.loadingTable = false;
    },

    async deleteItem(item, index) {
      if (!item.id) {
        this.items.splice(index, 1);
        return;
      }

      this.loadingTable = true;

      try {
        await Service.deleteItem(item.id);
        this.items = this.items.filter((el) => el.id !== item.id);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao excluir item!",
          type: "success",
        });
      } catch (error) {
        this.$store.commit("snackbar/set", {
          message: "Erro ao excluir item, contate o suporte!",
          type: "error",
        });
        this.getItems();
      }

      this.loadingTable = false;
      item.isEdit = false;
    },

    async createNewItem(item) {
      this.loadingTable = true;

      item.id = Date.now();
      item.isEdit = false;

      try {
        await Service.createItem(item);
        this.$store.commit("snackbar/set", {
          message: "Sucesso ao adicionar item",
          type: "success",
        });
      } catch (error) {
        console.log(error);
        this.$store.commit("snackbar/set", {
          message: "Erro ao adicionar item, contate o suporte!",
          type: "error",
        });
        this.getItems();
      }

      this.loadingTable = false;
    },

    addNewItem() {
      this.items.unshift({
        itemName: "",
        cod: "",
        observation: "",
        isEdit: true,
      });
    },

    verifyMandatoryFields(item) {
      if (!item.cod || item.cod == "" || !item.itemName || item.name == "")
        return true;
      return false;
    },
  },

  created() {
    this.getItems();
  },
};
</script>

<style>
</style>