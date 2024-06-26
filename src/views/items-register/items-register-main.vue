<template>
  <div>
    <h2 class="mb-4" v-if="!isModal">REGISTRO DE ITEMS</h2>
    <p v-if="!isModal">
      Registre os items que você desejar, e mais alguma descrição para preencher
      linha aqui
    </p>

    <v-card
      :loading="itemsLoading"
      :disabled="itemsLoading"
      :elevation="isModal ? '0' : '10'"
      class="pa-4 mt-6"
    >
      <h4 v-if="!isModal">ITEMS REGISTADOS</h4>
      <Dsg-loading-circular v-if="isLoading" class="mt-6" />

      <div v-else>
        <Dsg-btn
          title="Novo item"
          :icon="'mdi-plus'"
          @click="addNewItem"
          class="my-4"
        />
        <v-data-table
          :items="items"
          :headers="headers"
          :hide-default-footer="items.length <= 5"
        >
          <template v-slot:[`item.itemName`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{ item.itemName.toUpperCase() }}</span>
              <Dsg-text-field v-else v-model="item.itemName" />
            </div>
          </template>

          <template v-slot:[`item.cod`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{ item.cod.toUpperCase() }}</span>
              <Dsg-text-field v-else v-model="item.cod" />
            </div>
          </template>

          <template v-slot:[`item.observation`]="{ item }">
            <div>
              <span v-if="!item.isEdit">{{
                item.observation ? item.observation.toUpperCase() : "-"
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
import DsgLoadingCircular from "@/components/common/dsg-loading-circular.vue";
export default {
  components: { DsgTextField, DsgBtn, DsgLoadingCircular },
  props: {
    isModal: {
      default: false,
      type: Boolean,
    },
  },
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
  }),

  computed: {
    items() {
      return this.$store.state?.items?.items ?? []
    },

    itemsLoading() {
      return this.$store?.state?.getItemsLoading ?? false;
    },
  },

  methods: {
    async updateItem(item) {
      if (!item.id) {
        this.createNewItem(item);
        return;
      }

      this.loadingTable = true;

      item.isEdit = false;

      await this.$store.dispatch("UPDATE_ITEM", item);

      this.loadingTable = false;
    },

    async deleteItem(item, index) {
      if (!item.id) {
        this.items.splice(index, 1);
        return;
      }

      this.loadingTable = true;

      await this.$store.dispatch("DELETE_ITEM", item.id);
      item.isEdit = false;

      this.loadingTable = false;
    },

    async createNewItem(item) {
      this.loadingTable = true;

      item.isEdit = false;

      await this.$store.dispatch("CREATE_NEW_ITEM", item);

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
};
</script>

<style>
</style>