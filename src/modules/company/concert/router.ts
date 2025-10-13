import type { RouteRecordRaw } from "vue-router";
import ConcertIndex from "./pages/Index.vue";
export const CompanyConcertRouter: RouteRecordRaw[] = [
  {
    path: "concert",
    name: "company.concert",
    component: ConcertIndex,
    meta: { title: "Concert", public_auth: true },
  },
];
