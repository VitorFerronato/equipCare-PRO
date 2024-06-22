import service from "@/service/list-equipments.js"
const Service = new service()

export default {
    state: () => ({
        listEquipmentsLoading: false,

        equipments: [],
        equipmentsToTable: [],
        filteredEquipmentsToTable: [],
    }),

    mutations: {
        LIST_EQUIPMENTS(state, payload) {
            state.equipments = payload
        },

        SET_EQUIPMENTS_TO_TABLE(state, payload) {
            state.equipmentsToTable = payload
            state.filteredEquipmentsToTable = payload
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
    }
}