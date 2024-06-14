// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'
import service from "@/service/list-equipments.js"
import itemService from "@/service/items-area.js"
import categorieService from "@/service/categories-area.js"
const ItemService = new itemService()
const CategorieService = new categorieService()
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

    DELETE_ITEM(state, itemId) {
      state.items = state.items.filter((el) => el.id !== itemId);
    },

    DELETE_CATEGORIE(state, categorieId) {
      state.categories = state.categories.filter((el) => el.id !== categorieId);
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

    async CREATE_NEW_ITEM({ commit }, item) {
      let request = {
        ...item,
        id: Date.now()
      }

      try {
        await ItemService.createItem(request)

        commit('snackbar/set', { message: 'Sucesso ao adicionar item', type: 'success' }, { root: true });

      } catch (error) {
        commit('snackbar/set', { message: 'Erro ao criar novo items', type: 'error' }, { root: true });
      }
      this.dispatch('GET_ITEMS')
    },

    async UPDATE_ITEM({ dispatch, commit }, item) {
      try {
        await ItemService.updateItem(item)
        commit('snackbar/set', { message: 'Sucesso ao atualizar items', type: 'success' }, { root: true });

      } catch (error) {
        dispatch('GET_ITEMS')
        commit('snackbar/set', { message: 'Erro ao atualizar item', type: 'error' }, { root: true });
      }
    },

    async DELETE_ITEM({ commit, dispatch }, itemId) {

      try {
        await ItemService.deleteItem(itemId)
        commit('DELETE_ITEM', itemId)
        commit('snackbar/set', { message: 'Sucesso ao excluir items', type: 'success' }, { root: true });
      } catch (error) {
        dispatch('GET_ITEMS')
        commit('snackbar/set', { message: 'Erro ao excluir item', type: 'error' }, { root: true });
      }
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

    async CREATE_NEW_CATEGORIE({ commit, dispatch }, categorie) {
      let request = {
        ...categorie,
        id: Date.now()
      }

      try {
        await CategorieService.createCategorie(request)
        commit('snackbar/set', { message: 'Sucesso ao adicionar categoria', type: 'success' }, { root: true });
      } catch (error) {
        commit('snackbar/set', { message: 'Erro ao criar novo categoria', type: 'error' }, { root: true });
      }
      dispatch('GET_CATEGORIES')
    },

    async UPDATE_CATEGORIE({ dispatch, commit }, categorie) {
      try {
        await CategorieService.updateCategorie(categorie)
        commit('snackbar/set', { message: 'Sucesso ao atualizar categoria', type: 'success' }, { root: true });

      } catch (error) {
        dispatch('GET_CATEGORIES')
        commit('snackbar/set', { message: 'Erro ao atualizar categoria', type: 'error' }, { root: true });
      }
    },

    async DELETE_CATEGORIE({ commit }, categorieId) {

      try {
        await CategorieService.deleteCategorie(categorieId)
        commit('DELETE_CATEGORIE', categorieId)
        commit('snackbar/set', { message: 'Sucesso ao excluir categoria', type: 'success' }, { root: true });
      } catch (error) {
        commit('snackbar/set', { message: 'Erro ao excluir categoria', type: 'error' }, { root: true });
      }

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
            service.markToOrder = false
            commit('REMOVE_SERVICE_FROM_EQUIPMENT_IN_ORDER', { serviceId: service.idService, equipmentId });
          } else {
            service.markToOrder = true
            commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
          }
        } else {
          service.markToOrder = true
          commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
        }
      }
    },
  },
  modules: {
    snackbar
  }
})
