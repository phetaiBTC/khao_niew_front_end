<template>
    <div>
        <button @click="add(15, 2)">click</button>
    </div>
</template>

<script setup lang="ts">
function add(a: number, b: number) {
    console.log(a + b);
}
</script>

<style scoped></style>