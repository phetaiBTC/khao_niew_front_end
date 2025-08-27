import type { TableColumnsType } from 'ant-design-vue';

export interface UserEntity {
    id?: number,
    username: string,
    email: string,
    phone: string,
    role: 'admin' | 'company',
    created_At: string,
    updated_At: string
}

export const UserColumns: TableColumnsType  = [
    {
        title: "ຊື່ຜູ້ໃຊ້",
        dataIndex: "username",
        key: "username",
        align: "center",
    },
    {
        title: "ອີເມວ",
        dataIndex: "email",
        key: "email",
        align: "center",
    },
    {
        title: "ສິດທິ",
        dataIndex: "role",
        key: "role",
        align: "center",
    },
]