import type { BaseEntity } from "@/common/interface/baseEntity"

export interface UserEntity extends BaseEntity {
    id?: number,
    username: string,
    email: string,
    phone: string,
    role: 'admin' | 'company',
}

export interface IUser {
    id?: number | null,
    companyId?: number
    username: string,
    email: string,
    phone: string
    password: string
}