<template>
  <div class="w-full h-80">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed, reactive } from "vue";

const props = defineProps<{
  labels: string[];
  datas: number[];
  colors: string[];
}>();
ChartJS.register(ArcElement, Tooltip, Legend);

const data = computed(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: props.colors,
        data: props.datas,
      },
    ],
  };
});

const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>
div {
  position: relative;
}
</style>
