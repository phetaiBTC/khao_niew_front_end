import type { BaseEntity } from "@/common/interface/baseEntity"
import type { ConcertEntity } from "@/modules/admin/concert/types"
import type { UserEntity } from "@/modules/admin/users/type"

export interface IBooking {
    concert: number | null
    ticket_quantity: number
    email?: string
    userId?: number
    username?: string
}
export interface BookingEntity extends BaseEntity {
    id: number
    ticket_quantity: number
    unit_price: number
    total_amount: number
    booking_date: string
    user: UserEntity
    concert: ConcertEntity
    payment: {
        id: number
        amount: number
        payment_date: string
        status: string
        created_At: string
        updated_At: string
        images:{
            url:string
        }[]
    },
    details:{
        id: number
        status: string
    }[],

}