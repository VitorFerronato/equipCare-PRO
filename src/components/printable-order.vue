<template >
  <div style="width: 210mm; height: 297mm">
    <!-- HEADER -->
    <div style="text-align: center">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <img
          src="https://github.com/VitorFerronato/equipCare-PRO/blob/main/image.png?raw=true"
          style="width: 150px"
          alt="coppi logo"
        />
        <div>
          <h2>ORDEM DE SERVIÇO 002</h2>
          <h2>MANUTENÇÃO PREVENTIVA</h2>
        </div>
        <img
          src="https://github.com/VitorFerronato/equipCare-PRO/blob/main/image.png?raw=true"
          style="width: 150px"
          alt="coppi logo"
        />
      </div>
    </div>

    <div style="display: flex; flex-direction: column;height: 100%">
      <!-- EQUIPAMENTO -->
      <div style="display: flex; gap: 4px; margin-top: 16px">
        <div style="width: 80%; border: 0.5px solid black">
          <div
            style="
              border-bottom: 0.5px solid black;
              font-weight: bold;
              padding: 8px;
            "
          >
            EQUIPAMENTO
          </div>
          <div style="padding: 8px">TORNO NARDINI</div>
        </div>
        <div style="width: 20%; border: 0.5px solid black">
          <div
            style="
              border-bottom: 0.5px solid black;
              font-weight: bold;
              padding: 8px;
            "
          >
            EMISSÃO
          </div>
          <div style="padding: 8px">22/08/2024</div>
        </div>
      </div>

      <!-- SERVIÇOS -->
      <div style="margin-top: 16px">
        <table
          border="1"
          cellpadding="10"
          cellspacing="0"
          style="width: 100%; border-collapse: collapse; text-align: left"
        >
          <thead>
            <tr>
              <th
                style="
                  background-color: #f2f2f2;
                  font-weight: bold;
                  border: 0.5px solid black;
                "
              >
                SERVIÇO
              </th>
              <th
                style="
                  background-color: #f2f2f2;
                  font-weight: bold;
                  border: 0.5px solid black;
                "
              >
                ITEM
              </th>
              <th
                style="
                  background-color: #f2f2f2;
                  font-weight: bold;
                  border: 0.5px solid black;
                "
              >
                CATEGORIA
              </th>
              <th
                style="
                  background-color: #f2f2f2;
                  font-weight: bold;
                  border: 0.5px solid black;
                "
              >
                OBSERVAÇÃO
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 0.5px solid black">Rolamento da esteira</td>
              <td style="border: 0.5px solid black">Rolamento</td>
              <td style="border: 0.5px solid black">TORNO</td>
              <td style="border: 0.5px solid black">
                Precisa ser o rolamento de inox
              </td>
            </tr>
            <tr>
              <td style="border: 0.5px solid black">Troca de óleo</td>
              <td style="border: 0.5px solid black">óleo 5w30</td>
              <td style="border: 0.5px solid black">TORNO</td>
              <td style="border: 0.5px solid black">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- DESCRIÇÃO -->
      <div style="width: 100%; border: 0.5px solid black; margin-top: 16px">
        <div
          style="
            border-bottom: 0.5px solid black;
            font-weight: bold;
            padding: 8px;
          "
        >
          DESCRIÇÃO
        </div>
        <div style="padding: 12px; border-bottom: 0.5px solid black"></div>

        <div style="padding: 12px; border-bottom: 0.5px solid black"></div>
        <div style="padding: 12px; border-bottom: 0.5px solid black"></div>
      </div>
      <!-- MATERIAIS -->
      <div style="width: 100%; border: 0.5px solid black; margin-top: 16px">
        <div
          style="
            border-bottom: 0.5px solid black;
            font-weight: bold;
            padding: 8px;
          "
        >
          MATERIAIS
        </div>
        <div style="height: 200px"></div>
      </div>

      <!-- RESPONSÁVEL -->
      <div
        style="display: flex; gap: 4px; margin-top: 16px; justify-self: flex-end"
      >
        <div style="width: 80%; border: 0.5px solid black">
          <div
            style="
              border-bottom: 0.5px solid black;
              font-weight: bold;
              padding: 8px;
            "
          >
            RESPONSÁVEL
          </div>
          <div style="padding: 8px"></div>
        </div>
        <div style="width: 20%; border: 0.5px solid black">
          <div
            style="
              border-bottom: 0.5px solid black;
              font-weight: bold;
              padding: 8px;
            "
          >
            REALIZADO EM
          </div>
          <div style="padding: 8px;text-align:center"><span >___/___/___</span></div>
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



