import { useState, useEffect } from "react";
import { Button, Popover, notification } from "antd";
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
import {
  clearMessage,
  clearError,
} from "../../redux/features/authentication/authSlice";
import Confirm from "./components/pop-confirm";
import { NavbarProps } from "./types";

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [open, setOpen] = useState<boolean>(false);

  const showPopconfirm = () => setOpen(true);
  const handleOk = async () => {
    await dispatch(logoutThunk());
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const { name, logout } = useAppSelector((state) => state.auth);
  const {
    error,
    isLoading,
    logoutState: { message },
  } = logout;

  useEffect(() => {
    if (message) {
      const displayMessage =
        typeof message === "string" ? message : JSON.stringify(message);
      notification.success({
        message: "Logout Success",
        description: displayMessage,
      });
      dispatch(clearMessage());
    }
    if (error) {
      const displayError =
        typeof error === "string" ? error : JSON.stringify(error);
      notification.error({
        message: "Logout Failed",
        description: displayError,
      });
      dispatch(clearError());
    }
  }, [dispatch, error, message]);

  const handleLogout = () => {
    return (
      <Confirm
        title="Logout"
        description="Are you sure you want to log out?"
        confirmLoading={isLoading}
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        showPopconfirm={showPopconfirm}
      />
    );
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
        <span className="text-sm font-medium text-gray-800 transition-colors duration-300 ease-in-out hover:text-[#1890ff]">
          Logout
        </span>
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
