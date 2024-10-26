import { Outlet, Navigate } from "react-router-dom";
import { useTokenExpired } from "../utils/expired-token";

const PrivateRoutes = () => {
  const tokenExpired = useTokenExpired();
  return tokenExpired ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
