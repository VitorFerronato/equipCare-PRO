import { createRouter, createWebHistory } from 'vue-router'
import createEquipment from "@/views/create-equipment/create-equipment-main.vue"
import createServices from "@/views/create-services/create-services-main.vue"
import listEquipments from "@/views/list-equipment/list-equipment-main.vue"
import itemsRegister from "@/views/items-register/items-register-main.vue"
import categoriesRegister from "@/views/categories-register/categories-register-main.vue"
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
    path: '/create-services/:type?/:id?/:tag?',
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
  {
    path: '/categories-register',
    component: categoriesRegister,
    name: 'categories-register'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
