// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'

export default createStore({
  state: {
    equipments: [],
    filteredEquipments: [],
    listEquipmentsLoading: false
  },

  mutations: {
    LIST_EQUIPMENTS(state, payload) {
      state.equipments = payload
      state.filteredEquipments = payload
    },

    SET_FILTERED_EQUIPMENTS(state, filtered) {
      state.filteredEquipments = filtered;
    }
  },

  actions: {
    async GET_EQUIPMENTS({ commit, state }) {
      state.listEquipmentsLoading = true

      try {
        let response = await fetch("http://localhost:3000/equipments")
        let data = await response.json()
        
        commit('LIST_EQUIPMENTS', data)
      } catch (error) {
        console.log(error);
        commit('snackbar/set', { message: 'Erro ao carregar equipamentos', type: 'error' }, { root: true });
        commit('LIST_EQUIPMENTS', [])
      }

      state.listEquipmentsLoading = false
    },

    FILTER_ITEMS({ commit, state }, searchTerm) {
      const filtered = state.equipments.filter(item =>
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      commit('SET_FILTERED_EQUIPMENTS', filtered);
    }
  },
  modules: {
    snackbar
  }
})
