// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Popover, message as Message, Popconfirm } from "antd";
// import {
//   ExpandOutlined,
//   DownCircleOutlined,
//   UserOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { logout } from "../../api/services/auth/authApi";
// import { clearAccessToken } from "../../redux/features/authentication/authSlice";
// import { useAppSelector, useAppDispatch } from "../../redux/hooks";
// import { NavbarProps } from "./types";

// const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const [error, setError] = useState<string>();

//   const dispatch = useAppDispatch();
//   const { name } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     if (message) {
//       Message.success(message);
//     }
//     if (error) {
//       Message.error(error);
//     }
//   }, [error, message]);

//   const handleOk = async () => {
//     setOpen(false);
//     try {
//       setIsLoading(true);
//       const response = await logout();
//       if (response.status === 200) {
//         setMessage(response.data.message);
//         setTimeout(() => {
//           dispatch(clearAccessToken());
//         }, 2000);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         setError(error.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const popoverContent = (
//     <div className="flex flex-col">
//       <Link
//         to={"/profile"}
//         className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all"
//       >
//         <UserOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
//         <span className="text-sm font-medium text-gray-800">Profile</span>
//       </Link>
//       <Popconfirm
//         title="Logout"
//         description="Are you sure you want to logout?"
//         open={open}
//         onConfirm={handleOk}
//         okButtonProps={{ loading: isLoading }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       >
//         <div
//           className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
//           onClick={() => setOpen(true)}
//         >
//           <LogoutOutlined style={{ fontSize: "18px", color: "#ff4d4f" }} />
//           <span className="text-sm font-medium text-gray-800 transition-colors duration-300 ease-in-out hover:text-[#1890ff]">
//             Logout
//           </span>
//         </div>
//       </Popconfirm>
//     </div>
//   );

//   return (
//     <nav className="bg-[#fff] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 shadow-md z-50">
//       <div className="flex items-center gap-6">
//         <Button
//           className="hidden lg:block"
//           icon={<ExpandOutlined />}
//           onClick={onToggleSidebar}
//         />
//         <Link to="/dashboard">
//           <img
//             src="/assets/images/i-Tribe-logo.png"
//             alt="logo"
//             className="w-10 h-10 object-cover rounded-lg"
//           />
//         </Link>
//       </div>
//       <div className="flex items-center gap-4">
//         <Link to={"/notification"}>
//           <IoMdNotificationsOutline
//             style={{ fontSize: "24px", color: "#1890ff" }}
//           />
//         </Link>
//         <div className="flex items-center gap-4">
//           <div className="flex flex-col items-start justify-center">
//             <div className="text-base font-medium">{name}</div>
//             <div className="text-sm text-gray-500">Admin</div>
//           </div>
//           <Popover content={popoverContent} title="Options" trigger="hover">
//             <DownCircleOutlined
//               style={{ fontSize: "18px", color: "gray", cursor: "pointer" }}
//             />
//           </Popover>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState,  } from "react";
import axios from "axios";
import { Button, Popover, message as Message, Spin, List, Popconfirm } from "antd";
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
import { getAllNotification } from "../../api/services/notification/notificationApi";

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setMessage] = useState<string>("");
  const [, setError] = useState<string>();

  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.auth);

  // Fetch notifications on popover visibility change
  const handlePopoverVisibilityChange = async (visible: boolean) => {
    setIsPopoverVisible(visible);
    if (visible) {
      await fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    setIsNotificationsLoading(true);
    try {
      const response = await getAllNotification();
      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Message.error("Failed to load notifications");
      }
    } finally {
      setIsNotificationsLoading(false);
    }
  };

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

  const notificationContent = (
    <div style={{ width: "300px" }}>
      {isNotificationsLoading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500">No notifications</div>
      ) : (
        <List
          dataSource={notifications.slice(0, 3)} // Limit to 3 notifications
          renderItem={(notification) => (
            <List.Item key={notification._id}>
              <div className="text-sm text-gray-800">
                {notification.message}
                {notification.productVariantId && (
                   <Link
                   to={{
                     pathname: `/products/details/${notification.productVariantId}`, // The route for the product page
                   }}
                   className="text-blue-500 ml-2"
                 >
                   View
                 </Link>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
  
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
        <Popover
          content={notificationContent}
          title="Notifications"
          trigger="click"
          visible={isPopoverVisible}
          onVisibleChange={handlePopoverVisibilityChange}
        >
          <IoMdNotificationsOutline
            style={{ fontSize: "24px", color: "#1890ff", cursor: "pointer" }}
          />
        </Popover>
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
