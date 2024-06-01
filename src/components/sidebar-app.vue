<template>
  <v-navigation-drawer absolute expand-on-hover rail class="sidebar">
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="(item, index) in list"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.path"
        base-color="white"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    list: [
      {
        icon: "mdi-format-list-bulleted",
        title: "Equipamentos",
        path: "/list-equipments",
      },
      {
        icon: "mdi-tab-plus",
        title: "Cadastrar Equipamentos",
        path: "/create-equipment",
      },
      {
        icon: "mdi-tag-plus-outline",
        title: "Cadastrar categorias",
        path: "/categories-register",
      },
      {
        icon: "mdi-text-box-plus-outline",
        title: "Cadastrar items",
        path: "/items-register",
      },
    ],
  }),
};
</script>

<style lang="scss">
@import "../design/_colors.scss";
@import "../design/_sizes.scss";
.sidebar {
  padding-top: $header-height-lg;
  background-color: $header-color;
}
</style>