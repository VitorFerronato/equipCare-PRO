// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'
import service from "@/service/list-equipments.js"
const Service = new service()
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
    },
  },

  actions: {
    async GET_EQUIPMENTS({ commit, state }) {
      state.listEquipmentsLoading = true

      try {
        let response = await Service.getEquipments()
        commit('LIST_EQUIPMENTS', response?.data ?? [])
      } catch (error) {
        console.log(error);
        commit('snackbar/set', { message: 'Erro ao carregar equipamentos', type: 'error' }, { root: true });
        commit('LIST_EQUIPMENTS', [])
      }

      state.listEquipmentsLoading = false
    },

    FILTER_ITEMS({ commit, state }, searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = state.equipments.filter(item =>
        item.equipmentName.toLowerCase().includes(searchLower) ||
        item.tagName.toLowerCase().includes(searchLower)
      );
      commit('SET_FILTERED_EQUIPMENTS', filtered);
    },
  },
  modules: {
    snackbar
  }
})
