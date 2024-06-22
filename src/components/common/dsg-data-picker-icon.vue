<template>
  <v-menu :close-on-content-click="closeOnClick">
    <template v-slot:activator="{ props }">
      <v-icon color="#12192c" class="calendar" v-bind="props"
        >mdi-calendar-blank</v-icon
      >
    </template>

    <v-date-picker
      v-model="date"
      hide-header
      color="primary"
      elevation="24"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    closeOnClick: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    date: null,
  }),

  watch: {
    date: {
      handler(value) {
        this.$emit("setDate", moment(new Date(value)).format("DD/MM/YYYY"));
      },
      immediate: true,
    },
  },
  methods: {
    allowedDates(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas as datas
      const selectedDate = new Date(date);

      return selectedDate >= today;
    },
  },
};
</script>

<style scoped>
.field {
  pointer-events: none;
}

.calendar {
  pointer-events: all;
}
</style>