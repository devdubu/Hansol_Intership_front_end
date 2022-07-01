import { createWebHistory, createRouter } from "vue-router";
import CompanyProject from './components/CompanyProject.vue';
import ComfirmManager from './components/ConfirmManager.vue';
import NonEnterPerformance from './components/NonEnterPerformance.vue';
import StandardCode from './components/StandardCode.vue';
import DeadlineCalender from './components/DeadlineCalender.vue'
import PlanCalender from './components/PlanCalender.vue';
import PerfCalender from './components/PerfCalender.vue';
import RegisterPlan from "./components/RegisterPlan.vue";

const routes = [
  {
    path: "/performance",
    component: PerfCalender,
  },
  {
    path: "/plan",
    component: PlanCalender,
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
  },
  {
    path: "/registerplan",
    component: RegisterPlan,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;