import { defineStore } from "pinia";
import { ref } from "vue";
import type { MonthlyRevenue } from "../type";
import dayjs from "dayjs";
export const useDashboardStore = defineStore("dashboardStore", () => {
  const loadingDashboard = ref<boolean>(false);
  const reportRevenue = ref<MonthlyRevenue[]>();
  const queryYear = ref<string>(dayjs().format("YYYY"));
  return {
    loadingDashboard,
    reportRevenue,
    queryYear,
  };
});
