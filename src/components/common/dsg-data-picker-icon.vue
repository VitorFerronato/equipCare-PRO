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
        this.$emit("setDate", this.formatDate(value));
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

    formatDate(date) {
      if (!date) return null;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },

    getTodayDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
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