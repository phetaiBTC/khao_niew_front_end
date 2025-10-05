import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
import { useDashboardStore } from "../stores/useDashboardStore";
import { storeToRefs } from "pinia";
export const useDashboard = () => {
  const { reportRevenue, loadingDashboard, queryYear } = storeToRefs(
    useDashboardStore()
  );
  const setQueryYear = async (year: string) => {
    queryYear.value = year;
    await fetchReportRevenue();
  };
  const fetchReportRevenue = async () => {
    loadingDashboard.value = true;
    try {
      const { data } = await clientApi.get("/reports/report-revenue", {
        params: {
          year: queryYear.value,
        },
      });
      reportRevenue.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingDashboard.value = false;
    }
  };
  return {
    fetchReportRevenue,
    loadingDashboard,
    reportRevenue,
    queryYear,
    setQueryYear,
  };
};
