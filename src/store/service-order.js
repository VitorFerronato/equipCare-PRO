import orderHistoryService from "@/service/orders-history";
const OrderHistoryService = new orderHistoryService();

export default {
    state: () => ({
        getOrderHistoryLoading: false,
        serviceOrder: [],
        orderHistory: []
    }),

    mutations: {
        LIST_ORDER_HISTORY(state, payload) {
            state.orderHistory = payload
        },

        CLEAN_SERVICE_ORDER(state) {
            state.serviceOrder = []
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
    },

    actions: {
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

        ADD_TO_SERVICE_ORDER({ commit, state, rootState }, { service, equipmentId }) {
            const equipment = rootState.listEquipments?.equipments.find(e => e.id === equipmentId) ?? null

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
    }
}
