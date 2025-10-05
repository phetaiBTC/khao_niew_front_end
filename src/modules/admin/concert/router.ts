import type { RouteRecordRaw } from "vue-router";
import IndexConcert from "./pages/Index.vue";
import DetailConcert from "./pages/DetailConcert.vue";
export const ConcertRouter: RouteRecordRaw[] = [
  {
    path: "concert",
    name: "concert",
    component: IndexConcert,
    meta: { title: "Concert" },
  },
  {
    path: "concert/:id",
    name: "concert.detail",
    component: DetailConcert,
    meta: { title: "Concert" },
  },
];
