import { createRouter, createWebHistory } from 'vue-router'
import createEquipment from "@/views/create-equipment/create-equipment-main.vue"
import createServices from "@/views/create-services/create-services-main.vue"
import listEquipments from "@/views/list-equipment/list-equipment-main.vue"
import itemsRegister from "@/views/equipment-register/items-register-main.vue"
const routes = [
  {
    path: "/",
    redirect: 'list-equipments'
  },
  {
    path: '/create-equipment',
    component: createEquipment,
    name: 'create-equipment'
  },
  {
    path: '/create-services/:type?/:id?',
    component: createServices,
    name: 'create-services'
  },
  {
    path: '/list-equipments',
    component: listEquipments,
    name: 'list-equipments'
  },
  {
    path: '/items-register',
    component: itemsRegister,
    name: 'items-register'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
