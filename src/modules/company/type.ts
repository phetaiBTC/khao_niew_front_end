import type { IUser, UserEntity } from "../users/type"

export interface CompanyEntity {
    id?: number
    name: string
    user: UserEntity[]
    contact: string
    created_At: string
    updated_At: string
}

export interface ICompany {
    id?: number
    name: string
    contact: string
    user: IUser
}