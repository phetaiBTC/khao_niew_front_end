import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
import { useBookigStore, type BookingQuery } from "../store";
import { storeToRefs } from "pinia";
import { useImage } from "@/modules/images/composables/useImage";
// import router from "@/router";
import type { IBooking } from "../types";
export const useBooking = () => {
  const { BookingList, loadingBooking, params, Booking } = storeToRefs(
    useBookigStore()
  );
  const { imagesList } = useImage();

  const createBooking = async (formData: IBooking) => {
    try {
      const { data } = await clientApi.post("/booking/create", {
        ...formData,
        imageIds: imagesList.value,
      });
      message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ");
      // router.push({ name: "company.booking" });
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const fetchBookingList = async () => {
    loadingBooking.value = true;
    try {
      const { data } = await clientApi.get("/booking/all-bookings", {
        params: params.value,
      });
      BookingList.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingBooking.value = false;
    }
  };
  const fetchBookingListByEmail = async (email: string,page: number,per_page: number) => {
    loadingBooking.value = true;
    try {
      const { data } = await clientApi.get("/booking/get-bookings-by-email", {
        params: {
          page,
          per_page,
          email,
        },
      });
      BookingList.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingBooking.value = false;
    }
  };
  const updateStatus = async (id: number, status: string) => {
    try {
      const { data } = await clientApi.patch(`/payment/status/${id}`, {
        status,
      });
      message.success(data.message || "ອັບເດດຂໍ້ມູນສໍາເລັດ");
      await fetchBookingList();
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  const fetchBooking = async (id: number) => {
    loadingBooking.value = true;
    try {
      const { data } = await clientApi.get(`/booking/get-one/${id}`);
      Booking.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    } finally {
      loadingBooking.value = false;
    }
  };
  const setQuery = async (newParams: BookingQuery) => {
    params.value.page = newParams.page ?? params.value.page;
    params.value.per_page = newParams.per_page ?? params.value.per_page;
    params.value.search = newParams.search ?? params.value.search;
    params.value.type = newParams.type ?? params.value.type;
    params.value.order_by = newParams.order_by ?? params.value.order_by;
    params.value.status = newParams.status ?? params.value.status;
    params.value.companyId = newParams.companyId ?? params.value.companyId;

  };
  return {
    createBooking,
    fetchBookingList,
    BookingList,
    loadingBooking,
    setQuery,
    updateStatus,
    fetchBooking,
    Booking,
    fetchBookingListByEmail,
  };
};
