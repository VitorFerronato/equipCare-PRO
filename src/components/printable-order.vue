<template >
  <div style="width: 210mm; height: 297mm">
    <div style="text-align: center">
      <h2>ORDEM DE SERVIÇO 002</h2>
      <h2>MANUTENÇÃO PREVENTIVA</h2>
    </div>
    <div style="display: flex; gap: 4px; margin-top: 16px">
      <div style="width: 50%; border: 0.5px solid black">
        <div style="border: 0.5px solid black; font-weight: bold; padding: 8px">
          EQUIPAMENTO
        </div>
        <div style="padding: 8px">{{ orderToPrint.equipmentName }}</div>
      </div>
      <div style="width: 50%; border: 0.5px solid black">
        <div style="border: 0.5px solid black; font-weight: bold; padding: 8px">
          SERVIÇO
        </div>
        <div style="padding: 8px">{{ orderToPrint.serviceName }}</div>
      </div>
    </div>

    <div style="display: flex; gap: 4px; margin-top: 16px">
      <div style="width: 50%; border: 0.5px solid black">
        <div style="border: 0.5px solid black; font-weight: bold; padding: 8px">
          CATEGORIA
        </div>
        <div style="padding: 4px">FRESA</div>
        <div style="padding: 4px">Aqui alguma observação</div>
      </div>

      <div style="width: 50%; border: 0.5px solid black">
        <div style="border: 0.5px solid black; font-weight: bold; padding: 8px">
          ITEM
        </div>
        <div style="padding: 4px">VENTUINHA X</div>
        <div style="padding: 4px">Aqui outra observação</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orderToPrint"],
  data() {
    return {
      imgURL: "./coppi.jpg",
    };
  },
};
</script>



