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
                    <a-select v-model:value="status" :placeholder="$t('status')"
                        @change="setQuery({ status: status !== 'all' ? status : '', page: 1 })">
                        <a-select-option value="pending">{{ $t('pending') }}</a-select-option>
                        <a-select-option value="success">{{ $t('success') }}</a-select-option>
                        <a-select-option value="failed">{{ $t('failed') }}</a-select-option>
                    </a-select>
                    <a-select :options="optionCompany" v-model:value="company_id" :placeholder="$t('company')"
                        style="width: 200px;" @change="setQuery({ companyId: company_id || undefined, page: 1 })">
                    </a-select>

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
                            <a v-if="record.payment.images.length > 0"
                                :href="base_api + record.payment.images[0].url" target="_blank">
                                <FileImageOutlined style="cursor: pointer;"></FileImageOutlined>
                            </a>
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
                                    @click="updateStatus(record.payment.id, 'success')"
                                    v-show="record.payment.status === 'pending'" style="background: #13c2c2;">
                                    <div>
                                        <CheckOutlined />
                                    </div>
                                </a-button>
                                <a-button type="primary" size="small" @click="updateStatus(record.payment.id, 'failed')"
                                    style="background: red;" v-show="record.payment.status === 'pending'">
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
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, TagOutlined, CheckOutlined, CloseOutlined, FileImageOutlined } from '@ant-design/icons-vue';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { BookingEntity } from '@/modules/company/booking/types';
import dayjs from 'dayjs';
import 'dayjs/locale/lo';
import { onMounted, ref } from 'vue';
import { useBooking } from '@/modules/company/booking/composables/useBooking';
import { useCompany } from '../../company/composables/useCompany';
dayjs.locale('lo');
const { BookingList, fetchBookingList, loadingBooking, setQuery, updateStatus } = useBooking()
const { getOptionsCompany, optionCompany } = useCompany()
const orderBy = ref<"ASC" | "DESC">('DESC')
const company_id = ref<number | null>(null)
const status = ref<string | undefined>('pending')
const base_api = import.meta.env.VITE_API_BASE_URL
const onQuery = async (page?: number, pageSize?: number) => {
    setQuery({
        page: page,
        per_page: pageSize,
        order_by: orderBy.value
    })
}


const BookingCol = new BaseColumns<BookingEntity>([
    { dataIndex: 'booking_id', width: 100 },
    { dataIndex: 'company', width: 100 },
    { dataIndex: 'price' },
    { dataIndex: 'concert' },
])

onMounted(async () => {
    await getOptionsCompany();
    await fetchBookingList();
})

</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}

h1 {
    margin-bottom: 0 !important;
}
</style>