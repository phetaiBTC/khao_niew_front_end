import {
  UserOutlined,
  BankOutlined,
  BookOutlined,
  PictureOutlined,
  AimOutlined,
  TagOutlined,
  MenuOutlined,
  CompressOutlined,
  PieChartOutlined,
} from "@ant-design/icons-vue";
import type { Component } from "vue";
export const menuItems: {
  label: string;
  icon: Component;
  to: string | { name: string };
  children?: {
    label: string;
    // icon: Component,
    to: string | { name: string };
  }[];
}[] = [
  {
    label: "Dashboard",
    icon: PieChartOutlined,
    to: { name: "dashboard" },
  },
  {
    label: "user",
    icon: UserOutlined,
    to: { name: "user" },
  },
  {
    label: "company",
    icon: BankOutlined,
    to: { name: "company" },
  },
  {
    label: "entertainment",
    icon: BookOutlined,
    to: { name: "entertainment" },
  },
  {
    label: "concert",
    icon: PictureOutlined,
    to: { name: "concert" },
  },
  {
    label: "venue",
    icon: AimOutlined,
    to: { name: "venue" },
  },
  {
    label: "booking",
    icon: TagOutlined,
    to: { name: "booking" },
  },
  {
    label: "scan",
    icon: CompressOutlined,
    to: { name: "scan" },
  },
  // {
  //   label: "report",
  //   to: { name: "report" },
  //   icon: MenuOutlined,
  //   children: [
  //     {
  //       label: "Report_year",
  //       to: { name: "report.year" },
  //     },
  //   ],
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
];
