import type { RouteRecordRaw } from "vue-router";
import BookingIndex from "./pages/Index.vue";
import BookingCreate from "./pages/BookingCreate.vue";
import BookingDetails from "./pages/BookingDetails.vue";
export const BookingCompanyRouter: RouteRecordRaw[] = [
  {
    path: "booking",
    name: "company.booking",
    component: BookingIndex,
    meta: { title: "booking" },
  },
  {
    path: "booking/:id",
    name: "company.booking.detail",
    component: BookingDetails,
    meta: { title: "booking" },
  },
  {
    path: "booking/create/:concert_id",
    name: "company.booking.create",
    component: BookingCreate,
    meta: { title: "booking", public_auth: true },
  },
];
