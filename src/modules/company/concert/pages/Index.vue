<template>
  <a-card class="w-full">
    <template #title>
      <!-- <div class="flex items-center gap-2">
                <PictureOutlined></PictureOutlined>
                <h1 class="text-xl" style="margin: 0 !important;">{{ $t('concert') }}</h1>
            </div> -->
    </template>
    <template #extra>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <a-date-picker
            v-model:value="search"
            valueFormat="YYYY-MM-DD"
            placeholder="ຄົ້ນຫາ..."
            @change="setQuery({ search: search, page: 1 })"
          />
        </div>
      </div>
    </template>
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="concert in ConcertList.data"
        :key="concert.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <div
          class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col items-center"
        >
          <div
            class="w-full text-center py-2 font-semibold"
            :class="
              concert.limit != concert.totalTicket
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
          >
            {{ dayjs(concert.date).format("dddd DD-MM-YYYY") }}
          </div>

          <div class="w-full h-48 overflow-hidden">
            <a-carousel autoplay>
              <div
                v-for="(entertainment, i) in concert.entertainments"
                :key="i"
              >
                <div v-for="(img, j) in entertainment.images" :key="j">
                  <img :src="baseUrl + img.url" class="w-full object-cover" />
                  <p class="text-center">{{ entertainment.title }}</p>
                </div>
              </div>
            </a-carousel>
          </div>

          <div class="flex justify-between items-center w-4/5 my-2">
            <a-tag color="green">{{
              concert.price.toLocaleString() + " kip"
            }}</a-tag>
            <span class="text-gray-600 text-sm">
              {{ concert.totalTicket }} / {{ concert.limit }}
            </span>
          </div>

          <a-button
            block
            size="large"
            :type="
              concert.limit === concert.totalTicket ? 'default' : 'primary'
            "
            :disabled="concert.limit === concert.totalTicket"
            @click="
              router.push({
                name: 'company.booking.create',
                params: { concert_id: concert.id },
              })
            "
          >
            <template #icon><ShoppingOutlined /></template>
            {{
              $t(
                concert.limit === concert.totalTicket ? "sold_out" : "book_now"
              )
            }}
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { ShoppingOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/lo";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

dayjs.locale("lo");
import { useConcert } from "@/modules/admin/concert/composables/useConcert";
import router from "@/router";
const { fetchConcertList, ConcertList, setQuery } = useConcert();
const search = ref<string>("");
onMounted(async () => {
  await fetchConcertList();
});
</script>

<style scoped></style>
