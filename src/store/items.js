import itemService from "@/service/items-area.js"
const ItemService = new itemService()


export default {
    state: () => ({
        getItemsLoading: false,
        items: [],
    }),

    mutations: {
        LIST_ITEMS(state, payload) {
            state.items = payload
        },

        DELETE_ITEM(state, itemId) {
            state.items = state.items.filter((el) => el.id !== itemId);
        },
    },

    actions: {
        async GET_ITEMS({ commit, state }) {
            state.getItemsLoading = true

            try {
                let response = await ItemService.getItems()
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
    }
}
