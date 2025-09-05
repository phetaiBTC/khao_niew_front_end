<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('user') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formData" :rules="rulesCompany" @finish="onSumit">
            <a-row>
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('company') }}
                </a-divider>
                <a-col :span="24">
                    <FormInputString label="name" v-model="formData.name" :placeholder="$t('name')"
                        :prefix="BankOutlined" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="contact" v-model="formData.contact" placeholder="020XXXXXXXX"
                        :prefix="PhoneOutlined" />
                </a-col>
                <div class="w-full" v-if="!props.data">
                    <a-divider
                        style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                        {{ $t('information') }}
                    </a-divider>
                    <a-col :span="24">
                        <FormInputString label="username" v-model="formData.username" :placeholder="$t('username')"
                            :prefix="UserOutlined" />
                    </a-col>
                    <a-col :span="24">
                        <FormInputString label="email" v-model="formData.email" placeholder="example@gmail.com"
                            :prefix="MailOutlined" />
                    </a-col>
                    <a-col :span="24" v-if="!props.data">
                        <FormInputString v-model="formData.password" label="password" placeholder="********"
                            :prefix="LockOutlined" :type="'password'" />
                    </a-col>
                    <a-col :span="24">
                        <FormInputString label="phone" v-model="formData.phone" placeholder="020XXXXXXXX"
                            :prefix="PhoneOutlined" />
                    </a-col>
                </div>

                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingCompany">{{ $t('save')
                        }}</a-button>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import FormInputString from '@/components/FormInputString.vue';
import { BankOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
import { rulesCompany } from '../rules.ts';
import type { ICompany, CompanyEntity } from '../type';
import { useCompany } from '../composables/useCompany';


const { createCompany, updateCompany, loadingCompany } = useCompany()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    data: CompanyEntity | null
}>()
const emit = defineEmits(['isOpen'])
const formData = reactive<{ id?: number | null, name: string, contact: string, username: string, email: string, password: string, phone: string }>({
    id: null,
    name: '',
    contact: '',
    username: '',
    email: '',
    password: '',
    phone: ''
})
const formState = reactive<ICompany>({
    id: null,
    name: '',
    contact: '',
    user: {
        id: null,
        username: '',
        email: '',
        password: '',
        phone: ''
    }
})
const localOpen = computed({
    get: () => props.open,
    set: (val) => emit('isOpen', val)
})
watch(
    () => props.data,
    (value) => {
        if (value) {
            formData.id = value.id
            formData.name = value.name
            formData.contact = value.contact
        }
    }
)
const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
}
const onSumit = async () => {
    if (props.data) {
        formState.id = props.data.id
        formState.name = formData.name
        formState.contact = formData.contact
        await updateCompany(formState)
    } else {
        formState.name = formData.name
        formState.contact = formData.contact
        formState.user.username = formData.username
        formState.user.email = formData.email
        formState.user.password = formData.password
        formState.user.phone = formData.phone
        await createCompany(formState)
    }
    onClose()
}
</script>

<style scoped></style>