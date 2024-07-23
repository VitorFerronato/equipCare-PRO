<template>
  <div>
    <h2 class="mb-6">ORDENS DE SERVIÇO</h2>

    <Filter-area />

    <Order-history-list
      v-if="orders.length"
      :orders="orders"
      @printOrder="printOrder"
    />

    <v-row v-if="!orders.length" no-gutters justify="center" class="mt-6">
      <h2>NENHUMA ORDEM ENCONTRADA</h2>
    </v-row>

    <div ref="printableComponent" style="display: none">
      <Printable-order :orderToPrint="orderToPrint" />
    </div>
  </div>
</template>

<script>
import PrintableOrder from "@/components/printable-order.vue";
import FilterArea from "./components/filter-area.vue";
import OrderHistoryList from "./components/order-history-list.vue";

export default {
  components: {
    FilterArea,
    OrderHistoryList,
    PrintableOrder,
  },
  name: "list-service-orders",
  data() {
    return {
      orderToPrint: {
        equipmentName: "TORNO CNC ALGUMA COISA",
        serviceName: "Outro teste",
      },
    };
  },

  computed: {
    orders() {
      return this.$store?.state?.serviceOrder?.orderHistory ?? [];
    },
  },

  methods: {
    printOrder() {
      const printableComponent = this.$refs.printableComponent;

      if (!printableComponent) return;

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      const iframeDoc = iframe.contentWindow.document.open();
      iframeDoc.write(`
      <html>
        <head>
          <style>
            @media print {
              @page {
                margin: 0;
              }
              body {
                margin: 0;
              }
            }
            body {
              margin: 0;
              padding: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            ${[...document.styleSheets].map((s) => s.cssText).join("\n")}
          </style>
        </head>
        <body>
          ${printableComponent.innerHTML}
        </body>
      </html>
    `);
      iframeDoc.close();

      iframe.onload = function () {
        setTimeout(() => {
          iframe.contentWindow.print();
          document.body.removeChild(iframe);
        }, 1000);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.semaphore {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}


</style>