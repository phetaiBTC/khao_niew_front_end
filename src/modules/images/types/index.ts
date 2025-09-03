import type { BaseEntity } from "@/common/interface/baseEntity";

export interface ImageEntity extends BaseEntity {
    id: number;
    url: string;
}
export interface IImage {
    id?: number | null;
    file: any | null;
}