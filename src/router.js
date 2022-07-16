import { createWebHistory, createRouter } from "vue-router";
import CompanyProject from './components/CompanyProject.vue';
import ComfirmManager from './components/ConfirmManager.vue';
import NonEnterPerformance from './components/NonEnterPerformance.vue';
import StandardCode from './components/StandardCode.vue';
import DeadlineCalender from './components/DeadlineCalender.vue'
import PlanCalender from './components/PlanCalender.vue';
import PerfCalender from './components/PerfCalender.vue';
import RegisterPlan from "./components/RegisterPlan.vue";
import RegisterPlanDetail from "./components/RegisterPlanDetail.vue";
import ViewPlanDetail from "./components/ViewPlanDetail.vue";
import LoginForm from "./components/LoginForm.vue"
import RegisterPlanWeek from "./components/RegisterPlanWeek.vue";
import {createApp} from "vue";


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: "/login",
    component: LoginForm,
  },
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
    path: "/non-enter",
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
  },
  {
    path: '/registerplanweek',
    component: RegisterPlanWeek,
  },
  {
    path: "/registerplandetail",
    component: RegisterPlanDetail,
  },
  {
    path: "/viewplandetail",
    component: ViewPlanDetail
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;