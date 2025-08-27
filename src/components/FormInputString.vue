<template>
    <div>
        <a-form-item :label="$t(props.label)" :name="props.label">
            <a-input v-if="props.type == 'text'" v-model:value="modelValue" :placeholder="props.placeholder">
                <template #prefix>
                    <component v-if="props.prefix" :is="props.prefix" class="mr-1"></component>
                </template>
                <template #suffix>
                    <component v-if="props.suffix" :is="props.suffix"></component>
                </template>
            </a-input>
            <a-input-password v-else v-model:value="modelValue" :placeholder="props.placeholder">
                <template #prefix>
                    <component v-if="props.prefix" :is="props.prefix" class="mr-1"></component>
                </template>
                <template #suffix>
                    <component v-if="props.suffix" :is="props.suffix"></component>
                </template>
            </a-input-password>
        </a-form-item>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";

const props = withDefaults(defineProps<{
    modelValue: string;
    label: string;
    placeholder?: string | null;
    prefix?: Component | null;
    suffix?: Component | null;
    type?: 'text' | 'password';
}>(), {
    placeholder: '',
    prefix: null,
    suffix: null,
    type: 'text',
});


const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
</script>
