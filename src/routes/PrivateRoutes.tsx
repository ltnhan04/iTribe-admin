import { Outlet, Navigate } from "react-router-dom";
import { useTokenExpired } from "../utils/expired-token";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";

const PrivateRoutes = () => {
  const tokenExpired = useTokenExpired();
  return tokenExpired ? (
    <Navigate to="/login" />
  ) : (
    <div className="h-screen w-screen bg-grayLight px-5 sm:px-0">
      <Navbar />
      <div className="flex gap-9">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoutes;
