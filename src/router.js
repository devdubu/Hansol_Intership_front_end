import { createWebHistory, createRouter } from "vue-router";
import CalendarTable from './components/CalenderTable.vue';
import CompanyProject from './components/CompanyProject.vue';
import ComfirmManager from './components/ConfirmManager.vue';
import NonEnterPerformance from './components/NonEnterPerformance.vue';
import StandardCode from './components/StandardCode.vue';
import DeadlineCalender from './components/DeadlineCalender.vue'

const routes = [
  {
    path: "/performance",
    component: CalendarTable,
  },
  {
    path: "/plan",
    component: CalendarTable,
  },
  {
    path: "/project",
    component: CompanyProject,
  },
  {
    path: "/confirm",
    component: ComfirmManager,
  }
  ,
  {
    path: "/nonenter",
    component: NonEnterPerformance,
  },
  {
    path: "/standard",
    component: StandardCode,
  },
  {
    path: "/deadline",
    component: DeadlineCalender,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;