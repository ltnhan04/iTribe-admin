import { Button, Popover } from "antd";
import {
  ExpandOutlined,
  NotificationOutlined,
  DownCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logoutThunk } from "../../redux/features/authentication/authThunk";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  const popoverContent = (
    <div className="flex flex-col">
      <Link
        to={"/profile"}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all"
      >
        <UserOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
        <span className="text-sm font-medium text-gray-800">Profile</span>
      </Link>
      <div
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        onClick={handleLogout}
      >
        <LogoutOutlined style={{ fontSize: "18px", color: "#ff4d4f" }} />
        <span className="text-sm font-medium text-gray-800">Logout</span>
      </div>
    </div>
  );

  return (
    <nav className="bg-[#fff] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 shadow-md">
      <div className="flex items-center gap-6">
        <Button
          className="hidden lg:block"
          icon={<ExpandOutlined />}
          onClick={onToggleSidebar}
        />
        <Link to="/dashboard">
          <img
            src="/assets/images/i-Tribe-logo.png"
            alt="logo"
            className="w-10 h-10 object-cover rounded-lg"
          />
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <Link to={"/notification"}>
          <NotificationOutlined
            style={{ fontSize: "24px", color: "#1890ff" }}
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start justify-center">
            <div className="text-base font-medium">{name}</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
          <Popover content={popoverContent} title="Options" trigger="hover">
            <DownCircleOutlined
              style={{ fontSize: "18px", color: "gray", cursor: "pointer" }}
            />
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;