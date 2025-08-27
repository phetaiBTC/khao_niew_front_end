export interface UserEntity {
    id?: number,
    username: string,
    email: string,
    phone: string,
    role: 'admin' | 'company',
    created_At: string,
    updated_At: string
}