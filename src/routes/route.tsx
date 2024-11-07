/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const Dashboard = lazy(() => import("../pages/dashboard"));

const Inbox = lazy(() => import("../pages/inbox"));

const Orders = lazy(() => import("../pages/orders"));
//Product Page
const Products = lazy(() => import("../pages/products"));
import AddProduct from "../pages/products/pages/create-product";
import EditProduct from "../pages/products/pages/edit-product";
import ViewProduct from "../pages/products/pages/view-product";
import CreateProductVariant from "../pages/products/pages/create-product-variant";

const Promotions = lazy(() => import("../pages/promotions"));

const Stock = lazy(() => import("../pages/stock"));

const Users = lazy(() => import("../pages/users"));

import NotFound from "../pages/not-found";
import Loading from "../loading";

import Login from "../pages/auth/login";
import Notification from "../layouts/navbar/pages/notification";
import Profile from "../layouts/navbar/pages/profile";
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
      },
      {
        path: "products/create",
        element: <AddProduct />,
        children: [{ path: "variant", element: <CreateProductVariant /> }],
      },
      {
        path: "products/:productId/edit",
        element: <EditProduct />,
      },
      {
        path: "products/:productId",
        element: <ViewProduct />,
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
