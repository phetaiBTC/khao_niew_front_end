import {
  AuditOutlined,
  PictureOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { type Component } from "vue";
export const menuItemsCompany: {
  label: string;
  icon: Component;
  to?: string | { name: string };
  auth?: boolean;
  children?: {
    label: string;
    icon: Component;
    to: string | { name: string };
  }[];
  guard?: boolean;
}[] = [
  {
    label: "concert",
    icon: PictureOutlined,
    to: { name: "company.concert" },
  },
  {
    label: "booking",
    icon: TagOutlined,
    to: { name: "company.booking" },
  },
  {
    label: "company",
    guard: localStorage.getItem("token") ? false : true,
    icon: AuditOutlined, // icon ของ parent menu
    children: [
      {
        label: "company_report",
        icon: AuditOutlined,
        to: { name: "company.profile" },
      },
      {
        label: "company_user",
        icon: UserOutlined,
        to: { name: "company.user" },
      },
    ],
  },
  {
    label: "aboutus",
    icon: AuditOutlined,
    to: { name: "company.aboutus" },
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
];
