<template>
  <v-app>
    <Header />
    <v-main>
      <router-view class="view" />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/header-app.vue";
export default {
  components: { Header },
  name: "App",

  data: () => ({
    //
  }),

  methods: {},
  created() {
    this.$store.dispatch("GET_EQUIPMENTS", this.searchTerm);
  },
};
</script>


<style lang="scss">
@import "./design/_colors.scss";
@import "./design/_fonts.scss";

.v-application {
  background-color: $body-color !important;
}

.header-color {
  background-color: $header-color;
}

.text-white {
  color: #fff;
}

* {
  margin: 0;
  padding: 0;
  font-family: $font-base;
}

a {
  text-decoration: none;
  color: #000;
}

.view {
  margin: 2rem 3rem;
}

.dsg-flex-center {
  display: flex;
  align-items: center;
}

.red-border {
  border-left: 6px solid $danger-color;
  border-radius: 5px;
  padding-left: 0.2rem;
}
.yellow-border {
  border-left: 6px solid $warning-color;
  border-radius: 5px;
  padding-left: 0.2rem;
}
.orange-border {
  border-left: 6px solid orange;
  border-radius: 5px;
  padding-left: 0.2rem;
}
.green-border {
  border-left: 6px solid $success-color;
  border-radius: 5px;
  padding-left: 0.2rem;
}
</style>
