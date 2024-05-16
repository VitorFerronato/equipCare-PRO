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
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
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

.green-border {
  border-left: 6px solid green;
  border-radius: 5px;
  padding-left: .2rem;
}
.yellow-border {
  border-left: 6px solid yellow;
  border-radius: 5px;
  padding-left: .2rem;
}
.red-border {
  border-left: 6px solid red;
  border-radius: 5px;
  padding-left: .2rem;
}
.blue-border {
  border-left: 6px solid blue;
  border-radius: 5px;
  padding-left: .2rem;
}
</style>
