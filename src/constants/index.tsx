import {
  DashboardOutlined,
  InboxOutlined,
  ProductOutlined,
  UserOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export const menu = [
  {
    key: 1,
    name: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
  },
  {
    key: 2,
    name: "Categories",
    icon: <AppstoreOutlined />,
    path: "/categories",
  },
  {
    key: 3,
    name: "Products",
    icon: <ProductOutlined />,
    path: "/products",
  },
  {
    key: 4,
    name: "Users",
    icon: <UserOutlined />,
    path: "users",
  },
  {
    key: 5,
    name: "Orders",
    icon: <ShoppingCartOutlined />,
    path: "/orders",
  },
  {
    key: 6,
    name: "Promotions",
    icon: <GiftOutlined />,
    path: "/promotions",
  },

  {
    key: 7,
    name: "Inbox",
    icon: <InboxOutlined />,
    path: "/inbox",
  },
];

export const iphones = [
  { label: "iPhone 11", value: "iphone-11" },
  { label: "iPhone 12", value: "iphone-12" },
  { label: "iPhone 13", value: "iphone-13" },
  { label: "iPhone 14", value: "iphone-14" },
  { label: "iPhone 14 Plus", value: "iphone-14-plus" },
  { label: "iPhone 14 Pro", value: "iphone-14-pro" },
  { label: "iPhone 15", value: "iphone-15" },
  { label: "iPhone 15 Pro", value: "iphone-15-pro" },
  {
    label: "iPhone 15 Pro Max",
    value: "iphone-15-pro-max",
  },
  {
    label: "iPhone 15 Plus",
    value: "iphone-15-plus",
  },
  { label: "iPhone 16", value: "iphone-16" },
  {
    label: "iPhone 16 Plus",
    value: "iphone-16-plus",
  },
  {
    label: "iPhone 16 Pro",
    value: "iphone-16-pro",
  },
  {
    label: "iPhone 16 Pro Max",
    value: "iphone-16-pro-max",
  },
];

export const storages = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
