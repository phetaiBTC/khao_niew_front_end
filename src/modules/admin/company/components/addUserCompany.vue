<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('user') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formState" :rules="rulesUser" @finish="onSumit">
            <a-row>
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('information') }}
                </a-divider>
                <a-col :span="24">
                    <FormInputString label="username" v-model="formState.username" :placeholder="$t('username')"
                        :prefix="UserOutlined" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="email" v-model="formState.email" placeholder="example@gmail.com"
                        :prefix="MailOutlined" />
                </a-col>
                <a-col :span="24">
                    <FormInputString v-model="formState.password" label="password" placeholder="********"
                        :prefix="LockOutlined" :type="'password'" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="phone" v-model="formState.phone" placeholder="020XXXXXXXX"
                        :prefix="PhoneOutlined" />
                </a-col>
                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingUser">{{ $t('save')
                            }}</a-button>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import FormInputString from '@/components/FormInputString.vue';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref } from 'vue';
import { rulesUser } from '../../users/rules';
//d
import type { IUser } from '../../users/type';
import { useUser } from '../../users/composables/useUser';
import { useCompany } from '../composables/useCompany';

const { fetchCompanyList } = useCompany()

const { createUser, loadingUser } = useUser()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    companyId: number | null,
}>()
const emit = defineEmits(['isOpen'])

const formState = reactive<IUser>({
    id: null,
    username: '',
    email: '',
    password: '',
    phone: '',
})
const localOpen = computed({
    get: () => props.open,
    set: (val) => emit('isOpen', val)
})

const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
}
const onSumit = async () => {
    if (props.companyId == null) return
    formState.companyId = props.companyId
    await createUser(formState)
    await fetchCompanyList()
    onClose()
}
</script>

<style scoped></style>