import { createStore } from 'vuex'

export default createStore({
  state: {
    equipments: [
      {
        equipmentName: "COP 5894 - TORNO MULTIUSO",
        id: 17871,
        services: [
          {

            serviceName: "Troca de óleo",
            workHours: 281,
            daysUsed: 28,
            dateInterval: 800,
            nextMaintence: "22/08/2024 - 15:00",
          },
          {
            serviceName: "Troca de engrenagem",
            workHours: 87,
            daysUsed: 5,
            dateInterval: 41,
            nextMaintence: "22/10/2024 - 22:00",
          },
          {
            serviceName: "Troca da ventuinha de pano",
            workHours: 70,
            daysUsed: 10,
            dateInterval: 80,
            nextMaintence: "22/10/2024 - 22:00",
          },
        ]
      }
    ]
  },
  mutations: {
    // ADD_EQUIPMENT(state, payload) {
    //   state.equipment = payload
    // }
  },
  actions: {
  },
  modules: {
  }
})
