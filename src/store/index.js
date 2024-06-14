// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'
import service from "@/service/list-equipments.js"
const Service = new service()
export default createStore({
  state: {
    listEquipmentsLoading: false,
    getItemsLoading: false,
    getCategoriesLoading: false,

    equipments: [],
    items: [],
    categories: [],

    filteredEquipments: [],
    serviceOrder: [],

  },

  mutations: {
    LIST_EQUIPMENTS(state, payload) {
      state.equipments = payload
      state.filteredEquipments = payload
    },

    LIST_ITEMS(state, payload) {
      state.items = payload
    },

    LIST_CATEGORIES(state, payload) {
      state.categories = payload
    },

    SET_FILTERED_EQUIPMENTS(state, filtered) {
      state.filteredEquipments = filtered;
    },

    ADD_SERVICE_TO_EQUIPMENT_IN_ORDER(state, { service, equipment }) {
      let equipmentInOrder = state.serviceOrder.find(e => e.id === equipment.id);

      if (!equipmentInOrder) {
        equipmentInOrder = { ...equipment, services: [] };
        state.serviceOrder.push(equipmentInOrder);
      }

      equipmentInOrder.services.push(service);
    },

    REMOVE_SERVICE_FROM_EQUIPMENT_IN_ORDER(state, { serviceId, equipmentId }) {
      const equipmentInOrder = state.serviceOrder.find(e => e.id === equipmentId);

      if (equipmentInOrder) {
        equipmentInOrder.services = equipmentInOrder.services.filter(s => s.idService !== serviceId);

        if (equipmentInOrder.services.length === 0) {
          state.serviceOrder = state.serviceOrder.filter(e => e.id !== equipmentId);
        }
      }
    }
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

    async GET_ITEMS({ commit, state }) {
      state.getItemsLoading = true

      try {
        let response = await Service.getItems()
        commit('LIST_ITEMS', response?.data ?? [])
      } catch (error) {
        console.log(error);
        commit('snackbar/set', { message: 'Erro ao carregar items', type: 'error' }, { root: true });
        commit('LIST_ITEMS', [])
      }

      state.getItemsLoading = false
    },

    async GET_CATEGORIES({ commit, state }) {
      state.getCategoriesLoading = true

      try {
        let response = await Service.getCategories()
        commit('LIST_CATEGORIES', response?.data ?? [])
      } catch (error) {
        console.log(error);
        commit('snackbar/set', { message: 'Erro ao carregar categorias', type: 'error' }, { root: true });
        commit('LIST_CATEGORIES', [])
      }

      state.getCategoriesLoading = false
    },

    FILTER_ITEMS({ commit, state }, searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = state.equipments.filter(item =>
        item.equipmentName.toLowerCase().includes(searchLower) ||
        item.tagName.toLowerCase().includes(searchLower)
      );
      commit('SET_FILTERED_EQUIPMENTS', filtered);
    },

    ADD_TO_SERVICE_ORDER({ commit, state }, { service, equipmentId }) {
      const equipment = state.equipments.find(e => e.id === equipmentId);

      if (equipment) {
        const equipmentInOrder = state.serviceOrder.find(e => e.id === equipmentId);

        if (equipmentInOrder) {
          const serviceExists = equipmentInOrder.services.some(s => s.idService === service.idService);
          if (serviceExists) {
            commit('REMOVE_SERVICE_FROM_EQUIPMENT_IN_ORDER', { serviceId: service.idService, equipmentId });
          } else {
            commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
          }
        } else {
          commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
        }
      }
    },
  },
  modules: {
    snackbar
  }
})
