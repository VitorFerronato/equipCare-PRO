<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
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
};
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.dsg-flex-center {
  display: flex;
  align-items: center;
}
</style>
