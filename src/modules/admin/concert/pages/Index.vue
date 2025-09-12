<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="ConcertList" :loading="loadingConcert" :icon="PictureOutlined"
        title="concert" @on-delete="deleteConcert" @on-edit="onEdit($event)" @on-query="setQuery($event)"
        @on-create="onCreate" @on-search="setQuery($event)" :scroll="{ x: 1800 }" :input-search="false">
        <template #extra>
            <a-date-picker v-model:value="datePicker" format="DD-MM-YYYY" placeholder="ຄົ້ນຫາຕາມວັນທີ"
                @change="setQuery({ search: datePicker ? dayjs(datePicker).format('YYYY-MM-DD') : '', page: 1 })" />
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'user'">
                <a-tag color="blue">
                    <div class="flex gap-2 items-center justify-center">
                        <UserOutlined />
                        <h1 style="font-size: 1rem;margin: 0;">{{ record.user.length }}</h1>
                    </div>
                </a-tag>
            </template>
            <template v-if="column.key === 'price'">
                <a-tag color="blue">
                    <div class="flex gap-2 items-center justify-center">
                        <DollarCircleOutlined class="text-xl" />
                        <h1 style="margin: 0;">
                            {{ record.price.toLocaleString() }} kip
                        </h1>
                    </div>
                </a-tag>
            </template>
            <template v-if="column.key === 'status'">
                <a-tag :color="record.status === 'open' ? 'green' : 'red'">
                    <h1 style="margin: 0;font-size: 1rem;">{{ record.status }}</h1>
                </a-tag>
            </template>
            <template v-if="column.key === 'limit'">
                <!-- <UsergroupAddOutlined class="text-xl" /> -->
                <div class="flex">
                    <a-tag
                        :color="record.totalTicket === record.limit ? 'red' : record.totalTicket > record.limit ? 'orange' : 'green'">
                        {{ record.totalTicket === record.limit ? 'ເຕັມ' : record.totalTicket > record.limit ? 'ເກີນ' :
                            'ວ່າງ' }}
                    </a-tag>
                    <h1 style="margin: 0;">{{ record.totalTicket + " / " + record.limit }}</h1>
                </div>
            </template>
            <template v-if="column.key === 'venue'">
                <div class=" flex items-center justify-center gap-2">
                    <a :href="`https://www.google.com/maps/search/?api=1&query=${record.venue.latitude},${record.venue.longitude}`"
                        target="_blank" style="color: red;">
                        <AimOutlined class="text-xl" />
                    </a>
                    <h1 style="margin: 0;">{{ record.venue.name + ", " + record.venue.address }}</h1>
                </div>
            </template>
            <template v-if="column.key === 'Show_time'">
                <h1 style="margin: 0;">{{ record.startTime }}
                    <ArrowRightOutlined style="color: green;" /> {{ record.endTime }}
                </h1>
            </template>
            <template v-if="column.key === 'entertainments'">
                <a-tag v-for="r in record.entertainments" :key="r.id" color="blue">
                    <h1 style="margin: 0;">{{ r.title }}</h1>
                </a-tag>
            </template>
        </template>
    </BaseCRUD>
    <manageConcert :open="open" :data="companyRecord" @isOpen="open = $event"></manageConcert>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import { UserOutlined, DollarCircleOutlined, AimOutlined, PictureOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import manageConcert from '../components/ManageConcert.vue';
import { useConcert } from '../composables/useConcert';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { ConcertEntity } from '../types/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const datePicker = ref<Dayjs | null>(null);
const { setQuery, ConcertList, loadingConcert, deleteConcert, fetchConcertList } = useConcert()

const open = ref<boolean>(false)
const companyRecord = ref<ConcertEntity | null>(null)
const onEdit = (record: ConcertEntity) => {
    // console.log(record)
    companyRecord.value = record
    open.value = true
}
const onCreate = () => {
    companyRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<ConcertEntity>([
    { dataIndex: 'Show_time', ellipsis: true },
    { dataIndex: 'price', ellipsis: true },
    { dataIndex: 'limit', ellipsis: true, width: 150, align: "center" },
    { dataIndex: 'date', ellipsis: true },
    { dataIndex: 'status', ellipsis: true, width: 100, align: "center" },
    { dataIndex: 'venue', ellipsis: true, align: "center", width: 280 },
    { dataIndex: 'entertainments', ellipsis: true },
])
onMounted(async () => {
    await fetchConcertList();
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>