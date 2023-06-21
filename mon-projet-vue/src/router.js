import { createRouter, createWebHistory } from 'vue-router';
import ListOffresComponent from './components/ListOffres.vue';

const routes = [
  { path: '/', component: ListOffresComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
