/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const Dashboard = lazy(() => import("../pages/dashboard"));
const Inbox = lazy(() => import("../pages/inbox"));
const Orders = lazy(() => import("../pages/orders"));
const Products = lazy(() => import("../pages/products"));
const Promotions = lazy(() => import("../pages/promotions"));
const Stock = lazy(() => import("../pages/stock"));
import NotFound from "../pages/not-found";
import Login from "../pages/login";
import Loading from "../loading";
import UsersList from "../pages/users/components/userList";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <PrivateRoutes />
      </Suspense>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "inbox", element: <Inbox /> },
      { path: "orders", element: <Orders /> },
      { path: "products", element: <Products />, children: [] },
      { path: "users", element: <UsersList /> },
      { path: "promotions", element: <Promotions /> },
      { path: "stock", element: <Stock /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
