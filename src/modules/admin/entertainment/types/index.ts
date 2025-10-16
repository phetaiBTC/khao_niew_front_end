import type { BaseEntity } from "@/common/interface/baseEntity"

export interface EntertainmentEntity extends BaseEntity {
    id?: number
    title: string
    description: string
    images: imagesEntity[]
}

export interface IEntertainment {
    id?: number | null
    title: string
    description: string
    imageIds: number[] | null 
}

export interface imagesEntity extends BaseEntity {
    id?: number
    url: string
}