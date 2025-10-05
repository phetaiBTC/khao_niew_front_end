<template>
  <div v-if="detilConcert">
    <a-card title="กราฟรายได้ของแต่ละบริษัท" class="mt-3">
      <div class="flex gap-3 items-center justify-between">
        <div>
          <a-card :title="detilConcert.concert.entertainments[0].title">
            <p><b>{{ $t("venue") }}:</b> {{ detilConcert.concert.venue.name }}</p>
            <p><b>{{ $t("date") }}:</b> {{ detilConcert.concert.date }}</p>
            <p>
              <b>{{ $t("Show_time") }}:</b> {{ detilConcert.concert.startTime }} -
              {{ detilConcert.concert.endTime }}
            </p>
            <p><b>{{ $t("price") }}:</b> {{ detilConcert.concert.price }} บาท</p>
          </a-card>
        </div>
        <div>
          <PieChart
            :datas="pieValue.datas"
            :colors="pieValue.colors"
            :labels="pieValue.labels"
          ></PieChart>
        </div>
      </div>
    </a-card>
    <a-card :title="$t('company')" class="mt-3">
      <a-table
        :dataSource="detilConcert.companies"
        :columns="[
          { title: $t('name'), dataIndex: 'name' },
          { title: 'จำนวนจอง', dataIndex: 'total_bookings' },
          { title: 'จำนวนคน', dataIndex: 'total_people' },
          { title: 'รายได้รวม', dataIndex: 'total_revenue' },
        ]"
        rowKey="id"
        bordered
      />
    </a-card>

    <!-- 📊 กราฟ -->

    <!-- 💰 สรุป -->
    <a-card title="สรุป" class="mt-3">
      <p><b>รวมบริษัท:</b> {{ detilConcert.summary.total_companies }}</p>
      <p><b>รายได้รวม:</b> {{ detilConcert.summary.total_revenue }}</p>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useConcert } from "../composables/useConcert";
import { onMounted, reactive, watch } from "vue";
import PieChart from "@/components/PieChart.vue";
import type { detilConcert } from "../types";
const { detilConcert, fetchDeiledConcert } = useConcert();
const concertId = useRoute().params.id;
const pieValue = reactive<{
  labels: string[];
  datas: number[];
  colors: string[];
}>({
  labels: [],
  datas: [],
  colors: [],
});
function colorFromId(id: number): string {
  const hash = (id * 2654435761) % 0xffffffff;
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return `rgb(${r}, ${g}, ${b})`;
}

watch(
  () => detilConcert.value,
  (value) => {
    if (!value) return;
    pieValue.labels = value.companies.map((company) => company.name);
    pieValue.colors = value.companies.map((company) => colorFromId(company.id));
    pieValue.datas = value.companies.map((company) => company.total_people);
  }
);

onMounted(async () => {
  await fetchDeiledConcert(Number(concertId));
});
</script>

<style scoped></style>
