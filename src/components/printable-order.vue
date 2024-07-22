<template >
  <div style="width: 210mm; height: 297mm">
    <div style="text-align: center">
      <img
        src="https://www.coppi.ind.br/uploads/fotos_acontecimentos/20220703_7ahnk1oe.jpg"
        style="width: 250px"
      />
      <div>
        <h2>ORDEM DE SERVIÇO 002</h2>
        <h2>MANUTENÇÃO PREVENTIVA</h2>
      </div>
    </div>
    <div></div>
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
        <div style="padding: 4px; border-bottom: 0.8px solid #ccc">FRESA</div>
        <div style="padding: 4px; border-bottom: 0.8px solid #ccc">
          Aqui alguma observação
        </div>
      </div>

      <div style="width: 50%; border: 0.5px solid black">
        <div style="border: 0.5px solid black; font-weight: bold; padding: 8px">
          ITEM
        </div>
        <div style="padding: 4px; border-bottom: 0.8px solid #ccc">
          VENTUINHA X
        </div>
        <div style="padding: 4px; border-bottom: 0.8px solid #ccc">
          Aqui outra observação
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orderToPrint"],
  data() {
    return {
      imgURL: "src/components/coppi.jpg",
    };
  },
};
</script>



