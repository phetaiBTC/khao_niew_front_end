<template>
    <a-card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <TagOutlined></TagOutlined>
                <h1 class="text-xl" style="margin: 0 !important;">{{ $t('booking') }}</h1>
            </div>
        </template>
        <template #extra>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <a-button type="primary" @click="() => { orderBy = 'ASC'; onQuery() }" v-if="orderBy === 'DESC'">
                        <VerticalAlignTopOutlined />
                    </a-button>
                    <a-button type="primary" @click="() => { orderBy = 'DESC'; onQuery() }" v-if="orderBy === 'ASC'">
                        <VerticalAlignBottomOutlined />
                    </a-button>
                    <!-- <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="onSearch" />
                    <a-button type="primary" @click="onCreate">{{ $t('add') + ' ' +
                        $t(props.title) }}</a-button> -->
                </div>
            </div>
        </template>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-table :columns="BookingCol.getColumns()" :data-source="BookingList.data" :loading="loadingBooking"
                    :scroll="{ x: 'max-content', y: 1900 }" :pagination="false" size="small">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'booking_id'">
                            <a-tag color="blue">{{ "# " + record.id }}</a-tag>
                        </template>
                        <template v-if="column.key === 'company'">
                            <h1>
                                {{ record.user.companies.name }}
                            </h1>
                        </template>
                        <template v-if="column.key === 'concert'">
                            <h1>
                                {{ dayjs(record.concert.date).format('dddd DD-MM-YYYY') + ' | ' +
                                    record.concert.startTime + ' - ' + record.concert.endTime }}
                            </h1>
                        </template>
                        <template v-if="column.key === 'price'">
                            {{ record.unit_price.toLocaleString() + ' x ' + record.ticket_quantity + ' = ' }}<a-tag
                                color="green">{{
                                    record.total_amount.toLocaleString() + ' kip' }}</a-tag>
                        </template>
                        <template v-if="column.key === 'actions'">
                            <div class="flex gap-2 items-center justify-center">
                                <a-tag
                                    :color="record.payment.status === 'pending' ? 'gold' : record.payment.status === 'success' ? 'green' : 'red'">{{
                                        $t(record.payment.status) }}</a-tag>
                                <a-button type="primary" size="small"
                                    @click="updateStatus(record.payment.id, 'success')" style="background: #13c2c2;">
                                    <div>
                                        <CheckOutlined />
                                    </div>
                                </a-button>
                                <a-button type="primary" size="small"
                                    @click="updateStatus(record.payment.id, 'failed')" style="background: red;">
                                    <div>
                                        <CloseOutlined />
                                    </div>
                                </a-button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </a-col>
            <a-col :span="24">
                <div class="flex justify-end">
                    <a-pagination v-model:current="BookingList.pagination.page"
                        v-model:pageSize="BookingList.pagination.per_page" :total="BookingList.pagination.total"
                        show-size-changer show-quick-jumper :show-total="(total: number) => `ລາຍການທັງຫມົດ ${total}`"
                        :page-size-options="['6', '10', '20', '30']" @change="onQuery">
                    </a-pagination>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup lang="ts">
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, TagOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { BookingEntity } from '@/modules/company/booking/types';
import dayjs from 'dayjs';
import 'dayjs/locale/lo';
import { onMounted, ref } from 'vue';
import { useBooking } from '@/modules/company/booking/composables/useBooking';

dayjs.locale('lo');
const { BookingList, fetchBookingList, loadingBooking, setQuery, updateStatus } = useBooking()
const orderBy = ref<"ASC" | "DESC">('DESC')
const search = ref<string>('');
const onQuery = async (page?: number, pageSize?: number) => {
    await setQuery({ page: page || BookingList.value.pagination.page, per_page: pageSize || BookingList.value.pagination.per_page, search: search.value, order_by: orderBy.value })
}

const BookingCol = new BaseColumns<BookingEntity>([
    { dataIndex: 'booking_id' },
    { dataIndex: 'company' },
    { dataIndex: 'price' },
    { dataIndex: 'concert' },
])

onMounted(async () => {
    await fetchBookingList();
})

</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>