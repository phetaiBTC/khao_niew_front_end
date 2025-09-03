import type { BaseEntity } from "@/common/interface/baseEntity"
import type { EntertainmentEntity } from "@/modules/entertainment/types"
import type { venueEntity } from "@/modules/venue/types"

export interface IConcert {
    id?: number | null
    startTime: string
    endTime: string
    price: number
    limit: number
    date: string
    status: string
    venueId: number
    entertainmentIds: number[]
}
export interface ConcertEntity extends BaseEntity {
    id?: number
    startTime: string
    endTime: string
    price: number
    limit: number
    date: string
    status: string
    venue: venueEntity
    entertainments: EntertainmentEntity[]
}