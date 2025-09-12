<script setup lang="ts">
import { QrcodeStream } from "vue-qrcode-reader"
import { ref } from "vue"

const result = ref("")

function onDecode(content: string) {
    result.value = content
}
</script>

<template>
    <div>
        <qrcode-stream @decode="onDecode" />
        <p>ผลลัพธ์: {{ result }}</p>
    </div>
</template>
