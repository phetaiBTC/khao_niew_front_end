<template>
  <div class="w-full">
    <a-card>
      <template #title>
        <a-date-picker
          v-model:value="queryYear"
          picker="year"
          valueFormat="YYYY"
          @change="setQueryYear(queryYear)"
        />
        <a-button type="primary" @click="exportExcelYear(queryYear)"
            style="margin-left: 20px;">
            {{ $t('export_excel') }}
        </a-button>
      </template>
      <StackedBarChart
        :labels="data.labels"
        :datas="data.datas"
      ></StackedBarChart>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import StackedBarChart from "@/components/StackedBarChart.vue";
import { useDashboard } from "../composables/useDashboard";
import { onMounted, reactive, watch } from "vue";
import { colorFromId } from "@/common/utils/colorById";
import dayjs from "dayjs";
import "dayjs/locale/lo";
dayjs.locale("lo");
import { useReport } from "../../reports/composables/useReport";


const { exportExcelYear } = useReport()
const {
  fetchReportRevenue,
  queryYear,
  reportRevenue,

  setQueryYear,
} = useDashboard();

const data = reactive<{
  labels: string[];
  datas: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}>({
  labels: [],
  datas: [],
});

watch(
  () => reportRevenue.value,
  (value) => {
    if (!value) return;

    // ✅ Step 1: กำหนด labels เป็นชื่อเดือน
    data.labels = value.map((item) =>
      dayjs(`${item.year}-${item.month}-01`).format("MMM")
    );

    // ✅ Step 2: หาบริษัททั้งหมด (unique)
    const companies = new Map<number, string>();
    value.forEach((month) => {
      month.details.forEach((d) => {
        if (!companies.has(d.company.id)) {
          companies.set(d.company.id, d.company.name);
        }
      });
    });

    // ✅ Step 3: รวมยอดรายได้ต่อเดือนของแต่ละบริษัท
    const companyData = Array.from(companies.entries()).map(([id, name]) => {
      const monthlyRevenue = value.map((month) => {
        const total = month.details
          .filter((d) => d.company.id === id)
          .reduce((sum, d) => sum + d.total_revenue, 0);
        return total;
      });

      return {
        label: name,
        data: monthlyRevenue,
        backgroundColor: colorFromId(id),
      };
    });

    // ✅ Step 4: อัปเดต data สำหรับ chart
    data.datas = companyData;
  },
  { immediate: true }
);

onMounted(async () => {
  await fetchReportRevenue();
});
</script>

<style scoped></style>
