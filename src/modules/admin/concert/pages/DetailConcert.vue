<template>
  <div v-if="detilConcert">
    <a-card class="mt-3">
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <h1 class="text-xl" style="margin: 0 !important">
              {{ $t("concert") }}
            </h1>
            <h1 class="text-xl" style="margin: 0 !important">
              {{ detilConcert.concert.date }}
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <h1>
              {{ detilConcert.concert.price.toLocaleString() }} kip /{{
                $t("seat")
              }}
            </h1>
            <h1>{{ sumSeat }} / {{ detilConcert.concert.limit }} {{ $t("seat") }}</h1>
          </div>
        </div>
      </template>
      <div class="flex gap-3 items-center justify-around">
        <div>
          <a-card :title="$t('company')">
            <!-- <p><b>{{ $t("venue") }}:</b> {{ detilConcert.concert.venue.name }}</p>
            <p><b>{{ $t("date") }}:</b> {{ detilConcert.concert.date }}</p>
            <p>
              <b>{{ $t("Show_time") }}:</b> {{ detilConcert.concert.startTime }} -
              {{ detilConcert.concert.endTime }}
            </p>
            <p><b>{{ $t("price") }}:</b> {{ detilConcert.concert.price }} บาท</p> -->
            <a-table
              :dataSource="detilConcert.companies"
              :columns="[
                { title: $t('name'), dataIndex: 'name', key: 'name' },
                { title: 'จำนวนจอง', dataIndex: 'total_bookings' },
                { title: 'จำนวนคน', dataIndex: 'total_people' },
                { title: 'รายได้รวม', dataIndex: 'total_revenue' },
              ]"
              rowKey="id"
              borderedname
              :pagination="{
                pageSize: 5,
              }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <div>
                    <a-tag
                      :color="colorFromId(record.id)"
                      style="border: 1px solid black"
                    >
                      <UserOutlined />
                    </a-tag>
                    {{ record.name }}
                  </div>
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
        <div>
          <PieChart
            :datas="pieValue.datas"
            :colors="pieValue.colors"
            :labels="pieValue.labels"
          ></PieChart>
          <div class="mt-2 w-full flex justify-center items-center flex-col">
            <p><b>ລວມບໍລິສັດ:</b> {{ detilConcert.summary.total_companies }}</p>
            <a-tag color="green" style="font-size: 1.2rem"
              >ລາຍໄດ້ລວມ:
              {{ detilConcert.summary.total_revenue.toLocaleString() }}
              kip</a-tag
            >
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useConcert } from "../composables/useConcert";
import { onMounted, reactive, ref, watch } from "vue";
import PieChart from "@/components/PieChart.vue";
import type { detilConcert } from "../types";
import { UserOutlined } from "@ant-design/icons-vue";
const { detilConcert, fetchDeiledConcert } = useConcert();
const concertId = useRoute().params.id;
const sumSeat = ref(0);
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
    if (value) {
      pieValue.labels = value.companies.map((company) => company.name);
      pieValue.colors = value.companies.map((company) =>
        colorFromId(company.id)
      );
      pieValue.datas = value.companies.map((company) => company.total_people);
      sumSeat.value = value.companies.reduce(
        (total, company) => total + company.total_people,
        0
      );
    }
  }
);

onMounted(async () => {
  await fetchDeiledConcert(Number(concertId));
});
</script>

<style scoped></style>
