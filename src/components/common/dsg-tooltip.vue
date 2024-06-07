<template>
    <div id="tooltip">
        <v-tooltip class="tootip" right>
            <template v-slot:activator="{ on, attrs }">
                <v-icon class="icon" right v-bind="attrs" v-on="on">
                    mdi-information-outline</v-icon>
            </template>
            <span class="span">{{ title }}</span>
        </v-tooltip>
    </div>
</template>

<script>
export default {
    name: "toolTipInformationComponent",
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            requiired: true,
        },
    },
};
</script>

<style lang="scss" scoped>

</style>