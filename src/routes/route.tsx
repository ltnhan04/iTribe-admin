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
const Users = lazy(() => import("../pages/users"));

import AddProduct from "../pages/products/components/add-product";

import NotFound from "../pages/not-found";
import Loading from "../loading";

import Login from "../pages/auth/login";
import Notification from "../layouts/navbar/components/notification";
import Profile from "../layouts/navbar/components/profile";
import UserDetailPage from "../pages/users/components/UserDetailPage";

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
      {
        path: "products",
        element: <Products />,
        children: [{ path: "create", element: <AddProduct /> }],
      },
      { path: "users", element: <Users /> },
      { path: "users/:userId", element: <UserDetailPage /> },
      { path: "promotions", element: <Promotions /> },
      { path: "stock", element: <Stock /> },
      { path: "notification", element: <Notification /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
