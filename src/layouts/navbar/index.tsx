import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Popover, message as Message, Popconfirm } from "antd";
import {
  ExpandOutlined,
  DownCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { logout } from "../../api/services/auth/authApi";
import { clearAccessToken } from "../../redux/features/authentication/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { NavbarProps } from "./types";

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>();

  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      Message.success(message);
    }
    if (error) {
      Message.error(error);
    }
  }, [error, message]);

  const handleOk = async () => {
    setOpen(false);
    try {
      setIsLoading(true);
      const response = await logout();
      if (response.status === 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          dispatch(clearAccessToken());
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
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
      <Popconfirm
        title="Logout"
        description="Are you sure you want to logout?"
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: isLoading }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <LogoutOutlined style={{ fontSize: "18px", color: "#ff4d4f" }} />
          <span className="text-sm font-medium text-gray-800 transition-colors duration-300 ease-in-out hover:text-[#1890ff]">
            Logout
          </span>
        </div>
      </Popconfirm>
    </div>
  );

  return (
    <nav className="bg-[#fff] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 shadow-md z-50">
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
      <div className="flex items-center gap-4">
        <Link to={"/notification"}>
          <IoMdNotificationsOutline
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
