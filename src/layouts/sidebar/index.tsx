import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { MenuProps as MenuItemProps } from "./types";
import { menu as menuItems } from "../../constants";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const items = menuItems.map((item: MenuItemProps) => ({
    key: item.key,
    icon: item.icon,
    label: <Link to={item.path}>{item.name}</Link>,
  }));

  return (
    <Layout.Sider
      className="h-screen fixed top-[72px] left-0 bottom-0 shadow-md"
      breakpoint="lg"
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
