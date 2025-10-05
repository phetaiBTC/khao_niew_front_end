import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
import { useConcertStore } from "../store/useConcertStore";
import { storeToRefs } from "pinia";
import type { Params } from "@/common/interface/paramsPaginate";
import type { IConcert } from "../types";
export const useConcert = () => {
  const { ConcertList, loadingConcert, params, Concert, detilConcert } =
    storeToRefs(useConcertStore());
  const fetchConcertList = async () => {
    loadingConcert.value = true;
    try {
      const { data } = await clientApi.get("/concerts", {
        params: params.value,
      });
      ConcertList.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingConcert.value = false;
    }
  };
  const fetchConcert = async (id: number) => {
    loadingConcert.value = true;
    try {
      const { data } = await clientApi.get(`/concerts/${id}`);
      Concert.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingConcert.value = false;
    }
  };
  const setQuery = async (newParams: Params) => {
    params.value.page = newParams.page ?? params.value.page;
    params.value.per_page = newParams.per_page ?? params.value.per_page;
    params.value.search = newParams.search ?? params.value.search;
    params.value.type = newParams.type ?? params.value.type;
    params.value.order_by = newParams.order_by ?? params.value.order_by;
    await fetchConcertList();
  };

  const deleteConcert = async (id: number) => {
    try {
      const { data } = await clientApi.delete(`/concerts/${id}`);
      await fetchConcertList();
      message.success(data.message || "ລົບຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const createConcert = async (formData: IConcert) => {
    try {
      const { id, ...rest } = formData;
      const { data } = await clientApi.post("/concerts", rest);
      await fetchConcertList();
      message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const updateConcert = async (formData: IConcert) => {
    try {
      const { id, ...rest } = formData;
      const { data } = await clientApi.patch(`/concerts/${formData.id}`, rest);
      await fetchConcertList();
      message.success(data.message || "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const fetchDeiledConcert = async (id: number) => {
    loadingConcert.value = true;
    try {
      const { data } = await clientApi.get(`/concerts/${id}/profile`);
      detilConcert.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingConcert.value = false;
    }
  };
  return {
    ConcertList,
    loadingConcert,
    fetchConcertList,
    setQuery,
    deleteConcert,
    createConcert,
    updateConcert,
    fetchConcert,
    Concert,
    fetchDeiledConcert,
    detilConcert,
  };
};
