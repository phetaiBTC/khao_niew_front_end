<template>
    <div>
        <a-date-picker v-model:value="selectYear" picker="year" :bordered="false" />
        <a-button type="primary" @click="exportExcelYear(dayjs(selectYear).format('YYYY'))"
            style="background-color: #13c2c2;">
            {{ $t('export_excel') }}
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { useReport } from '../composables/useReport';
import dayjs, { Dayjs } from 'dayjs';
import { ref } from 'vue';

const { exportExcelYear } = useReport()
const selectYear = ref<Dayjs | null>(dayjs());
</script>

<style scoped></style>