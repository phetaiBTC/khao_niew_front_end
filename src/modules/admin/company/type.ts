import type { BaseEntity } from "@/common/interface/baseEntity";
import type { IUser, UserEntity } from "../users/type";
export interface CompanyEntity extends BaseEntity {
  id?: number;
  name: string;
  user: UserEntity[];
  contact: string;
}

export interface ICompany {
  id?: number | null;
  name: string;
  contact: string;
  user: IUser;
}

export interface ICompanyTotal {
  company: {
    id: number;
    name: string;
  };
  statistics: {
    total_bookings: number;
    total_revenue: number;
    total_users: number;
    total_people: number;
  };
  payment_status: {
    pending: number;
    completed: number;
    failed: number;
  };
}
