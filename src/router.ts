import { AuthRouter } from "@/modules/auth/router";
import { UserRouter } from "@/modules/admin/users/router";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/Default.vue";
import AuthorizedPage from "@/components/Authorized.vue";
import NotFound from "./components/NotFound.vue";
import { authGuard } from "./guard/authGuard";
import { CompanyRouter } from "./modules/admin/company/router";
import { EntertainmentRouter } from "./modules/admin/entertainment/router";
import { ConcertRouter } from "./modules/admin/concert/router";
import { VenueRouter } from "./modules/admin/venue/router";
import CompanyLayout from "./layouts/CompanyLayout.vue";
import { BookingCompanyRouter } from "./modules/company/booking/router";
import { CompanyConcertRouter } from "./modules/company/concert/router";
import { roleGuard } from "./guard/roleGuard";
import { BookingRouter } from "./modules/admin/booking/router";
import { ReportsRouter } from "./modules/admin/reports/router";
import { ScanRouter } from "./modules/admin/scan/router";
import { CompanyUserRouter } from "./modules/company/users/router";
import { DashboardRouter } from "./modules/admin/dashboard/router";
const routes = [
  {
    path: "/admin",
    component: DefaultLayout,
    meta: { title: "Admin", role: "admin" },
    children: [
      ...UserRouter,
      ...CompanyRouter,
      ...EntertainmentRouter,
      ...ConcertRouter,
      ...VenueRouter,
      ...BookingRouter,
      ...ReportsRouter,
      ...DashboardRouter
    ],
  },
  {
    path: "/companies",
    component: CompanyLayout,
    meta: { title: "Companies", role: "company" },
    children: [
      ...BookingCompanyRouter,
      ...CompanyConcertRouter,
      ...CompanyUserRouter,
    ],
  },
  {
    path: "/authorized",
    name: "authorized",
    component: AuthorizedPage,
    meta: { title: "Authorized" },
  },
  {
    path: "/not-found",
    name: "not-found",
    component: NotFound,
    meta: { title: "Not Found" },
  },
  ...AuthRouter,
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "not-found" },
  },
  ...ScanRouter,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);
router.beforeEach(roleGuard);
export default router;
