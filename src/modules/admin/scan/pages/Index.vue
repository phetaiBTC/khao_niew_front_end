<script setup lang="ts">
import { QrcodeStream } from "vue-qrcode-reader"
import { ref } from "vue"
import { message } from "ant-design-vue"

const result = ref("")

function onDecode(content: string) {
    result.value = content
    message.success("ສະແດງຂໍ້ມູນສໍາເລັດ")
}
</script>

<template>
    <div>
        <qrcode-stream @decode="onDecode" />
        <p>ผลลัพธ์: {{ result }}</p>
    </div>
</template>
