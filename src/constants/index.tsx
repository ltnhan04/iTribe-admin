import {
  DashboardOutlined,
  InboxOutlined,
  ProductOutlined,
  UserOutlined,
  StockOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
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
    name: "Products",
    icon: <ProductOutlined />,
    path: "/products",
  },
  {
    key: 3,
    name: "Orders",
    icon: <ShoppingCartOutlined />,
    path: "/orders",
  },
  {
    key: 4,
    name: "Promotions",
    icon: <GiftOutlined />,
    path: "/promotions",
  },
  {
    key: 5,
    name: "Users",
    icon: <UserOutlined />,
    path: "users",
  },
  {
    key: 6,
    name: "Product Stock",
    icon: <StockOutlined />,
    path: "/stock",
  },
  {
    key: 7,
    name: "Inbox",
    icon: <InboxOutlined />,
    path: "/inbox",
  },
];
