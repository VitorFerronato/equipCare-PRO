<template>
  <div>
    <Header />
  </div>
</template>

<script>
import Header from "./components/header-app.vue";
export default {
  components: { Header },
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

.dsg-flex-center{
  display: flex;
  align-items: center;
}
</style>
