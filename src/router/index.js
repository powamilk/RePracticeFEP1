import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import FormCreateView from '@/views/FormCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path : '/create',
      name : 'create-book',
      component: FormCreateView
    },
    {
      path : '/book/:id',
      name : 'book-detail',
      component : DetailView
    }
  ]
})

export default router
