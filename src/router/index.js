import { createRouter, createWebHistory } from 'vue-router'
import createEquipment from "@/views/create-equipment/create-equipment-main.vue"
const routes = [
  {
    path: '/create-equipment',
    component: createEquipment,
    name: 'create-equipment'
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
