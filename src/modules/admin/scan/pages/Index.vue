<script setup lang="ts">
import { BrowserQRCodeReader } from "@zxing/browser";
import { onMounted, ref } from "vue";
import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
const result = ref("");
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(async () => {
  const codeReader = new BrowserQRCodeReader();
  const devices = await BrowserQRCodeReader.listVideoInputDevices();

  if (devices.length > 0) {
    // หากล้องหลัง (ส่วนใหญ่ชื่อจะมีคำว่า 'back' หรือ 'rear')
    const rearCamera = devices.find(
      (d) =>
        d.label.toLowerCase().includes("back") ||
        d.label.toLowerCase().includes("rear")
    );

    const deviceId = rearCamera ? rearCamera.deviceId : devices[0].deviceId;

    codeReader.decodeFromVideoDevice(
      deviceId,
      videoRef.value!,
      async (res, _err) => {
        if (res) {
          result.value = res.getText();
          try {
            await clientApi.post("/check-in/create-check-in", {
              booking_details: Number(result.value),
            });
            message.success("Check-in successful");
          } catch {
            message.error("Check-in failed");
          }
        }
      }
    );
  }
});
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center relative">
    <video
      ref="videoRef"
      class="w-full h-full object-cover border"
      autoplay
    ></video>

    <!-- overlay 1:1 -->
    <div
      class="absolute top-1/2 left-1/2 h-1/2 aspect-square border-4 border-red-500 -translate-x-1/2 -translate-y-1/2"
    ></div>
  </div>
</template>
