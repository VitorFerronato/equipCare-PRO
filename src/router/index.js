import { createRouter, createWebHistory } from 'vue-router'
import createEquipment from "@/views/create-equipment/create-equipment-main.vue"
import createServices from "@/views/create-services/create-services-main.vue"
import listEquipments from "@/views/list-equipment/list-equipment-main.vue"
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
    path: '/create-services/:type/:id',
    component: createServices,
    name: 'create-services'
  },
  {
    path: '/list-equipments',
    component: listEquipments,
    name: 'list-equipments'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
