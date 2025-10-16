<template>

  <BaseCRUD :columns="UserCol.getColumns()" :data="EntertainmentList" :loading="loadingEntertainment"
    :icon="BookOutlined" title="entertainment" @on-delete="deleteEntertainment" @on-edit="onEdit($event)"
    @on-query="setQuery($event)" @on-create="onCreate" @on-search="setQuery($event)" :scroll="{ x: 'max-content' }"
    :tab-list="tabList">
    <template #card="{ value }">
      <a-card hoverable style="width: 100%; box-shadow: 0 5px 10px #f4f4f4; overflow: hidden">
        <template #cover>
          <a-carousel autoplay>
            <div v-for="item in value.images">
              <img alt="..." :src="item.url" class="aspect-square w-full object-cover" />
            </div>
          </a-carousel>
        </template>
        <template #actions>
          <EditOutlined key="edit" @click="onEdit(value)" />
          <a-popconfirm :title="$t('Are_you_sure_delete_this')" @confirm="deleteEntertainment(value.id)"
            :ok-text="$t('yes')" :cancel-text="$t('cancel')">
            <DeleteOutlined key="delete"></DeleteOutlined>
          </a-popconfirm>
        </template>
        <a-card-meta :title="value.title">
          <template #description>
            <span class="text-nowrap overflow-hidden text-ellipsis block max-w-[200px]">
              {{ value.description }}
            </span>
          </template>
        </a-card-meta>
      </a-card>
    </template>
  </BaseCRUD>
  <manageCompany :open="open" :data="companyRecord" @isOpen="open = $event"></manageCompany>
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import manageCompany from "../components/ManageEntertainment.vue";
import { useEntertainment } from "../composables/useEntertainment";
import { BaseColumns } from "@/common/utils/baseColumn";
import type { EntertainmentEntity } from "../types/index";
const {
  setQuery,
  EntertainmentList,
  loadingEntertainment,
  deleteEntertainment,
  fetchEntertainmentList,
} = useEntertainment();
const tabList = [
  { key: "table", tab: "table" },
  { key: "card", tab: "card" },
];
const open = ref<boolean>(false);
const companyRecord = ref<EntertainmentEntity | null>(null);
const onEdit = (record: EntertainmentEntity) => {
  console.log(record);
  companyRecord.value = record;
  open.value = true;
};
const onCreate = () => {
  companyRecord.value = null;
  open.value = true;
};
const UserCol = new BaseColumns<EntertainmentEntity>([
  {
    dataIndex: "title",
    ellipsis: true,
    width: 200,
    fixed: "left",
    sorter: (a: EntertainmentEntity, b: EntertainmentEntity) =>
      a.title.localeCompare(b.title),
  },
  { dataIndex: "description", ellipsis: true },
]);
onMounted(async () => {
  await fetchEntertainmentList();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
