import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import HouseCreateEditView from '@/views/HouseCreateEditView.vue';
import HouseDetailView from '@/views/HouseDetailView.vue';

// Define the routes for the application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/create',
    name: 'HouseCreate',
    component: HouseCreateEditView,
  },
  {
    path: '/edit/:id',
    name: 'HouseEdit',
    component: HouseCreateEditView,
    props: true, // Enable passing props from the route
  },
  {
    path: '/details/:id',
    name: 'HouseDetail',
    component: HouseDetailView,
    props: true, // Enable passing props from the route
  },
];

// Create the router instance with defined routes and history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
