import type { BaseEntity } from "@/common/interface/baseEntity"

export interface venueEntity extends BaseEntity {
    id?: number | null
    name: string
    address: string
    latitude: number
    longitude: number
}

export interface IVenue {
    id?: number | null
    name: string
    address: string
    latitude: number
    longitude: number
}