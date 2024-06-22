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
import moment from "moment";
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
      this.formatedDate = moment(new Date(this.date)).format("DD/MM/YYYY");
    },
    formatedDate: {
      handler(value) {
        this.$emit("setDate", value);
      },
      immediate: true,
    },
  },

  created() {
    this.formatedDate = moment().format("DD/MM/YYYY");
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