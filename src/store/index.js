// index.js
import { createStore } from 'vuex'
import snackbar from './snackbar'
import items from "./items"
import categories from "./categories"
import serviceOrder from "./service-order"
import listEquipments from './list-equipments'

export default createStore({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    snackbar,
    items,
    categories,
    serviceOrder,
    listEquipments
  }
})
