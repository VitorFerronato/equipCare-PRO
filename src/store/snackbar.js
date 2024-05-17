// snackbar.js
const state = {
    message: null,
    type: null
  };
  
  const mutations = {
    reset(state) {
      state.message = null
      state.type = null
    },
    set(state, data) {
      state.message = data.message
      state.type = data.type
    }
  };
  
  const getters = {
    snackbarData: state => state
  };
  
  export default {
    namespaced: true, 
    state,
    mutations,
    getters,
  };
  