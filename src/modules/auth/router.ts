import LoginPage from './pages/Login.vue'
export const AuthRouter = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'Login', public_auth: true }
    }
]