<template>
  <div class="mt-6">
    <v-data-table
      :headers="headers"
      :items="orders"
      :hide-default-footer="orders.length <= 5"
    >
      <template v-slot:[`item.situation`]="{ item }">
        <td>
          <div :class="item.situation ? 'done' : 'undone'">
            {{ item.situation ? "Realizado" : "Não realizado" }}
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["orders"],
  data: () => ({
    headers: [
      {
        title: "Situação",
        value: "situation",
        sortable: true,
      },
      {
        title: "Número da ordem",
        value: "orderId",
        sortable: true,
      },
      {
        title: "Data da criação",
        value: "creationDate",
        sortable: true,
      },
      {
        title: "Equipamento",
        value: "equipmentName",
        sortable: true,
      },
      {
        title: "Serviço",
        value: "serviceName",
        sortable: true,
      },
      {
        title: "Ações",
        value: "actions",
        sortable: false,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.undone {
  width: 100px;
  text-align: center;
  border-radius: 5px;
  padding: 12px 0rem;
  color: white;
  background-color: #b00020;
}

.done {
  width: 100px;
  text-align: center;
  padding: 12px 0rem;
  border-radius: 5px;
  color: white;
  background-color: #1d8527;
}
</style>
