// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'
import service from "@/service/list-equipments.js"
import itemService from "@/service/items-area.js"
import categorieService from "@/service/categories-area.js"
import orderHistoryService from "@/service/orders-history";
const ItemService = new itemService()
const CategorieService = new categorieService()
const Service = new service()
const OrderHistoryService = new orderHistoryService();
export default createStore({
  state: {
    listEquipmentsLoading: false,
    getItemsLoading: false,
    getCategoriesLoading: false,
    getOrderHistoryLoading: false,

    equipments: [],
    equipmentsToTable: [],
    filteredEquipmentsToTable: [],

    items: [],
    categories: [],

    serviceOrder: [],
    orderHistory: []
  },

  mutations: {
    LIST_EQUIPMENTS(state, payload) {
      state.equipments = payload
    },

    LIST_ITEMS(state, payload) {
      state.items = payload
    },

    LIST_CATEGORIES(state, payload) {
      state.categories = payload
    },

    LIST_ORDER_HISTORY(state, payload) {
      state.orderHistory = payload
    },

    SET_EQUIPMENTS_TO_TABLE(state, payload) {
      state.equipmentsToTable = payload
      state.filteredEquipmentsToTable = payload
    },

    DELETE_ITEM(state, itemId) {
      state.items = state.items.filter((el) => el.id !== itemId);
    },

    DELETE_CATEGORIE(state, categorieId) {
      state.categories = state.categories.filter((el) => el.id !== categorieId);
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
        equipmentInOrder.services = equipmentInOrder.services.filter(s => s.serviceId !== serviceId);

        if (equipmentInOrder.services.length === 0) {
          state.serviceOrder = state.serviceOrder.filter(e => e.id !== equipmentId);
        }
      }
    },

    CLEAN_SERVICE_ORDER(state) {
      state.serviceOrder = []
    },

    SET_FILTERED_EQUIPMENTS(state, filteredEquipments) {
      state.filteredEquipmentsToTable = filteredEquipments;
    },
  },

  actions: {
    async GET_EQUIPMENTS({ commit, dispatch, state }) {
      state.listEquipmentsLoading = true

      try {
        let response = await Service.getEquipments()
        commit('LIST_EQUIPMENTS', response?.data ?? [])
        dispatch('SET_EQUIPMENTS_TO_TABLE', response?.data ?? [])
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

    async GET_ORDER_HISTORY({ commit, state }) {
      state.getOrderHistoryLoading = true

      try {
        let response = await OrderHistoryService.getOrdersHistory()
        commit('LIST_ORDER_HISTORY', response?.data ?? [])
      } catch (error) {
        console.log(error);
        commit('snackbar/set', { message: 'Erro ao carregar histórico de ordens', type: 'error' }, { root: true });
        commit('LIST_ORDER_HISTORY', [])
      }

      state.getOrderHistoryLoading = false
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

    SET_EQUIPMENTS_TO_TABLE({ commit }, equipments) {
      let newEquipments = equipments.flatMap((equipment) =>
        equipment.services.map((service) => ({
          equipmentName: equipment?.equipmentName.toUpperCase() ?? "-",
          tagName: equipment?.tagName.toUpperCase() ?? "-",
          semaphore: service.semaphore,
          id: equipment.id,
          serviceName: service?.serviceName.toUpperCase() ?? "-",
          item: service?.item?.toUpperCase() ?? "-",
          categorie: service?.categorie?.toUpperCase() ?? "-",
          changePeriod: service.changePeriod,
          nextMaintence: service.nextMaintence,
          workRegime: service.workRegime,
          weekRegime: service.weekRegime,
          realized: service.realized,
          serviceId: service.serviceId,
          serviceOrder: service?.serviceOrder ?? null,
        }))
      );

      commit('SET_EQUIPMENTS_TO_TABLE', newEquipments)
    },

    ADD_TO_SERVICE_ORDER({ commit, state }, { service, equipmentId }) {
      const equipment = state.equipments.find(e => e.id === equipmentId);

      if (equipment) {
        const equipmentInOrder = state.serviceOrder.find(e => e.id === equipmentId);

        if (equipmentInOrder) {
          const serviceExists = equipmentInOrder.services.some(s => s.serviceId === service.serviceId);
          if (serviceExists) {
            service.markToOrder = false
            commit('REMOVE_SERVICE_FROM_EQUIPMENT_IN_ORDER', { serviceId: service.serviceId, equipmentId });
          } else {
            service.markToOrder = true
            commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
          }
        } else if (!equipmentInOrder && !state.serviceOrder.length) {
          service.markToOrder = true
          commit('ADD_SERVICE_TO_EQUIPMENT_IN_ORDER', { service, equipment });
        } else {
          service.blockEquipment = true
          commit('snackbar/set', { message: 'Não é possível adicionar equipamentos diferentes na ordem de serviço!', type: 'error' }, { root: true });
        }
      }
    },

    GET_EQUIPMENT_BY_ID({ state }, id) {
      return state.equipments.find((e) => e.id == id)
    },

    FILTER_ITEMS({ state, commit }, filters) {
      let filtered = state.equipmentsToTable;

      filters.forEach(filter => {
        if (filter.selected.length > 0) {
          const selectedValues = filter.selected.map(item => item.value);
          filtered = filtered.filter(equipment =>
            selectedValues.includes(equipment[filter.tag])
          );
        }
      });

      commit('SET_FILTERED_EQUIPMENTS', filtered);
    },



  },
  modules: {
    snackbar
  }
})
