import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Register from "../components/Register";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import CartPage from "../pages/shop/CartPage";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import ForgetPassword from "../components/ForgetPassword";
import ContactUs from "../components/ContactUs";
import UserDashboard from "../pages/dashboard/UserDashboard";
import Order from "../pages/dashboard/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/contact-us",
        element: (
          <PrivateRouter>
            <ContactUs />
          </PrivateRouter>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRouter>
            <UserDashboard />
          </PrivateRouter>
        ),
      },
      {
        path: "/order",
        element: (
          <PrivateRouter>
            <Order />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRouter>
            <UpdateProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/process_checkout",
        element: (
          <PrivateRouter>
            <Payment />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:6001/menu/${params.id}`),
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
    ],
  },
]);

export default router;
