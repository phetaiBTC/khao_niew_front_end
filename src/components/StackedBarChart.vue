<template>
  <div class="w-full">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  labels: string[];
  datas: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}>();
const data = computed (() => {
  return {
    labels: props.labels,
    datasets: props.datas
  };
});
const options = reactive<ChartOptions<"bar">>({
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Stacked Bar Chart รายได้บริษัท" },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
});

// const data = reactive({
//   labels: ["Jan", "Feb", "Mar", "Apr"],
//   datasets: [
//     { label: "บริษัท A", data: [30, 50, 70, 40], backgroundColor: "#41B883" },
//     { label: "บริษัท B", data: [20, 30, 50, 25], backgroundColor: "#E46651" },
//     { label: "บริษัท C", data: [10, 20, 30, 15], backgroundColor: "#00D8FF" },
//   ],
// });
</script>
