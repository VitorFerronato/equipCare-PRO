<template>
  <div>
    <label>
      {{ title }}
    </label>
    <v-tooltip v-if="tooltipText" :text="tooltipText" class="mt-0 pa-0">
      <template v-slot:activator="{ props }">
        <v-icon small class="ml-2" v-bind="props"
          >mdi-information-outline</v-icon
        >
      </template>
    </v-tooltip>

    <v-text-field
      v-model="formatedDate"
      v-bind="$attrs"
      :append-icon="appendIcon"
      hide-details="auto"
      variant="outlined"
      density="compact"
      class="mt-1 field"
    >
      <template v-slot:append-inner>
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
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    appendIcon: {
      type: String,
      default: "",
    },
    tooltipText: {
      tooltipText: String,
      default: null,
    },
    closeOnClick: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    date: null,
    formatedDate: null,
  }),

  watch: {
    date() {
      this.formatedDate = this.formatDate(this.date);
    },
    formatedDate: {
      handler(value) {
        this.$emit("setDate", value);
      },
      immediate: true,
    },
  },

  methods: {
    formatDate(date) {
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

  created() {
    this.formatedDate = this.getTodayDate();
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