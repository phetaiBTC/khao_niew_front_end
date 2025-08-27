<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="p-5 rounded-xl" style="box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);">
            <a-form :model="formState" name="normal_login" class="login-form w-[250px]" @finish="Login(formState)"
                layout="vertical" :rules="rules">
                <div>
                    <img src="/src/assets/images/logoKhaoNiew.png" alt="" srcset="" class="w-35 mx-auto">
                </div>
                <FormInputString v-model="formState.email" label="email" placeholder="example@gmail.com"
                    :prefix="UserOutlined" />
                <FormInputString v-model="formState.password" label="password" placeholder="*******"
                    :prefix="LockOutlined" :type="'password'" />
                <a-form-item>
                    <a-button :loading="loadingAuth" :disabled="disabled" type="primary" html-type="submit"
                        class="login-form-button w-full">
                        {{ $t('login') }}
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useAuth } from '../composables/useAuth';
import FormInputString from '@/components/FormInputString.vue';
import type { IFromLogin } from '../interface';
import { rules } from '../rules';
const { Login, loadingAuth } = useAuth();
const formState = reactive<IFromLogin>({
    email: 'admin@gmail.com',
    password: 'password'
});
const disabled = computed(() => {
    return !(formState.email && formState.password);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 500px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
