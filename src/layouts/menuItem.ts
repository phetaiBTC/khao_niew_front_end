import {
    PieChartOutlined,
    UserOutlined,
    BankOutlined
} from '@ant-design/icons-vue';
import type { Component } from 'vue';
export const menuItems: {
    label: string,
    icon: Component,
    to: string | { name: string },
    children?: {
        label: string,
        icon: Component,
        to: string | { name: string },
    }[]
}[] = [
        {
            label: 'Dashboard',
            icon: PieChartOutlined,
            to: '/'
        },
        {
            label: 'user',
            icon: UserOutlined,
            to: { name: 'user' }
        },
        {
            label: 'company',
            icon: BankOutlined,
            to: { name: 'company' }
        },
        // {
        //     key: 'sub1',
        //     label: 'User Group',
        //     icon: UserOutlined,
        //     children: [
        //         { key: '3', label: 'Tom', to: '/tom' },
        //         { key: '4', label: 'Bill', to: '/bill' },
        //         { key: '5', label: 'Alex', to: '/alex' }
        //     ]
        // },
        // {
        //     key: 'sub2',
        //     label: 'Team',
        //     icon: TeamOutlined,
        //     children: [
        //         { key: '6', label: 'Team 1', to: '/team1' },
        //         { key: '8', label: 'Team 2', to: '/team2' }
        //     ]
        // },
        // {
        //     key: '9',
        //     label: 'File',
        //     icon: FileOutlined,
        //     to: '/file'
        // }
    ]