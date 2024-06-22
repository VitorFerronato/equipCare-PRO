import categorieService from "@/service/categories-area.js"
const CategorieService = new categorieService()

export default {
    state: () => ({
        getCategoriesLoading: false,
        categories: [],

    }),

    mutations: {
        LIST_CATEGORIES(state, payload) {
            state.categories = payload
        },

        DELETE_CATEGORIE(state, categorieId) {
            state.categories = state.categories.filter((el) => el.id !== categorieId);
        },

    },

    actions: {

        async GET_CATEGORIES({ commit, state }) {
            state.getCategoriesLoading = true

            try {
                let response = await CategorieService.getCategories()
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
    },


}