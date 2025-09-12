<script setup lang="ts">
import { BrowserQRCodeReader } from '@zxing/browser'
import { onMounted, ref } from 'vue'
import { clientApi } from '@/plugins/axiosPlugin'
import { message } from 'ant-design-vue'
const result = ref("")
const videoRef = ref<HTMLVideoElement | null>(null)

onMounted(async () => {
    const codeReader = new BrowserQRCodeReader()
    const devices = await BrowserQRCodeReader.listVideoInputDevices()
    if (devices.length > 0) {
        codeReader.decodeFromVideoDevice(devices[0].deviceId, videoRef.value!, async (res, _err) => {
            if (res) {
                result.value = res.getText()
                await clientApi.post('/check-in/create-check-in', { booking_details: Number(result.value) })
                    .then(() => {
                        message.success("Check-in successful")
                    }).catch(() => {
                        message.error("Check-in failed")
                    })
            }
        })
    }
})
</script>

<template>
    <div>
        <video ref="videoRef" style="width: 100%; border: 1px solid #ccc;" autoplay></video>
        <p class="text-3xl">ผลลัพธ์: {{ result }}</p>
    </div>
</template>
