import { createRouter, createWebHistory } from 'vue-router'
import createEquipment from "@/views/create-equipment/create-equipment-main.vue"
import createServices from "@/views/create-services/create-services-main.vue"
const routes = [
  {
    path: '/create-equipment',
    component: createEquipment,
    name: 'create-equipment'
  },
  {
    path: '/create-services/:id',
    component: createServices,
    name: 'create-services'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
