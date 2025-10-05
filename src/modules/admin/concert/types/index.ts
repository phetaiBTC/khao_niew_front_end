import type { BaseEntity } from "@/common/interface/baseEntity";
import type { EntertainmentEntity } from "@/modules/admin/entertainment/types";
import type { venueEntity } from "@/modules/admin/venue/types";
import type { Dayjs } from "dayjs";

export interface IConcert {
  id?: number | null;
  startTime: Dayjs | string;
  endTime: Dayjs | string;
  price: number | null;
  limit: number;
  date: Dayjs | string;
  status: string;
  venueId: number | null;
  entertainmentIds: number[] | null;
}
export interface ConcertEntity extends BaseEntity {
  id?: number;
  startTime: string;
  endTime: string;
  price: number;
  totalTicket: number;
  limit: number;
  date: string;
  status: string;
  venue: venueEntity;
  entertainments: EntertainmentEntity[];
}

export interface detilConcert {
  concert: {
    id?: number;
    startTime: string;
    endTime: string;
    price: number;
    totalTicket: number;
    limit: number;
    date: string;
    venue: venueEntity;
    entertainments: EntertainmentEntity[];
  };
  companies: {
    id: number;
    name: string;
    total_bookings: number;
    total_revenue: number;
    total_people: number;
  }[];
  summary: {
    total_companies: number;
    total_revenue: number;
  };
}
