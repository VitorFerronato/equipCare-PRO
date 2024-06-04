<template>
  <v-app>
    <Header />
    <Sidebar-app />
    <v-main>
      <router-view class="view" />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Header from "./components/header-app.vue";
import Snackbar from "@/components/common/dsg-snackbar.vue";
import SidebarApp from "./components/sidebar-app.vue";
export default {
  components: { Header, Snackbar, SidebarApp }, 
  name: "App",

  data: () => ({
    //
  }),

  methods: {},
  created(){
    console.log('foi criado');
  }
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
.dsg-flex-column {
  display: flex;
  flex-direction: column;
}

.gap-1{
  gap: 1rem;
}

.red-border {
  border-left: 6px solid $danger-color  !important;
  border-radius: 5px  !important;
  padding-left: 0.2rem  !important;
}
.yellow-border {
  border-left: 6px solid $warning-color  !important;
  border-radius: 5px  !important;
  padding-left: 0.2rem  !important;
}
.orange-border {
  border-left: 6px solid orange  !important;
  border-radius: 5px  !important;
  padding-left: 0.2rem  !important;
}
.green-border {
  border-left: 6px solid $success-color !important;
  border-radius: 5px !important;
  padding-left: 0.2rem !important;
}

.red-background {
  border-left: 6px solid $danger-color;
}
.yellow-background {
  border-left: 6px solid $warning-color;
}
.orange-background {
  border-left: 6px solid orange;
}
.green-background {
  border-left: 6px solid $success-color;
}
</style>
