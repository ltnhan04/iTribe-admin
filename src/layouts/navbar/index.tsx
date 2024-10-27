import { Button } from "antd";
import {
  ExpandOutlined,
  NotificationOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { name } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-[#fff] px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 shadow-md ">
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
          {" "}
          <NotificationOutlined
            style={{ fontSize: "24px", color: "#1890ff" }}
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start justify-center">
            <div className="text-base font-medium">{name}</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
          <Link to={"/profile"}>
            <DownCircleOutlined style={{ fontSize: "18px", color: "gray" }} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
