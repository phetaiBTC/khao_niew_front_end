import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
import { useEntertainmentStore } from "../store/useEntertainmentStore";
import { storeToRefs } from "pinia";
import type { Params } from "@/common/interface/paramsPaginate";
import type { EntertainmentEntity, IEntertainment } from "../types/index";
import { useImage } from "@/modules/images/composables/useImage";
export const useEntertainment = () => {
  const { imagesList } = useImage();
  const {
    EntertainmentList,
    loadingEntertainment,
    params,
    optionEntertainment,
  } = storeToRefs(useEntertainmentStore());
  const fetchEntertainmentList = async () => {
    loadingEntertainment.value = true;
    try {
      const { data } = await clientApi.get("/entertainments", {
        params: params.value,
      });
      EntertainmentList.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingEntertainment.value = false;
    }
  };
  const setQuery = async (newParams: Params) => {
    params.value.page = newParams.page ?? params.value.page;
    params.value.per_page = newParams.per_page ?? params.value.per_page;
    params.value.search = newParams.search ?? params.value.search;
    params.value.type = newParams.type ?? params.value.type;
    params.value.order_by = newParams.order_by ?? params.value.order_by;

    await fetchEntertainmentList();
  };

  const deleteEntertainment = async (id: number) => {
    try {
      const { data } = await clientApi.delete(`/entertainments/${id}`);
      await fetchEntertainmentList();
      message.success(data.message || "ລົບຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const createEntertainment = async (formData: IEntertainment) => {
    try {
      const { id, ...rest } = formData;
      const { data } = await clientApi.post("/entertainments", {
        ...rest,
        imageIds: imagesList.value,
      });
      await fetchEntertainmentList();
      imagesList.value = [];
      message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const updateEntertainment = async (formData: IEntertainment) => {
    try {
      const { id, ...rest } = formData;
      const { data } = await clientApi.patch(`/entertainments/${formData.id}`, {
        ...rest,
        imageIds: imagesList.value,
      });
      await fetchEntertainmentList();
      imagesList.value = [];
      message.success(data.message || "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const getOptionsEntertainment = async () => {
    const { data } = await clientApi.get("/entertainments", {
      params: { search: "", type: "all" },
    });
    optionEntertainment.value = data.data.map((item: EntertainmentEntity) => ({
      value: item.id,
      label: item.title,
    }));
  };
  return {
    EntertainmentList,
    loadingEntertainment,
    fetchEntertainmentList,
    setQuery,
    deleteEntertainment,
    createEntertainment,
    updateEntertainment,
    getOptionsEntertainment,
    optionEntertainment,
  };
};
