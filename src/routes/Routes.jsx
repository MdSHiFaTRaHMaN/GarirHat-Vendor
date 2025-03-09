import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Main from "../layout/Main";
import DashBoard from "../pages/homepage/DashBoard";
import AddMyCar from "../pages/addcar/AddMyCar";
import UserMessage from "../pages/usermessage/UserMessage";
import MyCarList from "../pages/myVehicles/MyCarList";
import CarDetails from "../pages/singleVehicle/CarDetails";
import UserProfile from "../pages/UserProfilePage.jsx/UserProfile";
import Practic from "../Practic";
import MyVehicles from "../pages/myVehicles/MyVehicles";
import EditVehicle from "../pages/editVehicle/EditVehicle";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/add-my-car",
        element: <AddMyCar />,
      },
      {
        path: "/user-messages",
        element: <UserMessage />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/my-car-list",
        element: <MyCarList />,
      },
      {
        path: "/my-vehicles",
        element: <MyVehicles />,
      },
      {
        path: "/my-vehicles/:vehicleID",
        element: <CarDetails />,
      },
      {
        path: "/my-vehicles/:vehicleID/edit",
        element: <EditVehicle />,
      },
      {
        path: "/test",
        element: <Practic />,
      },
    ],
  },
]);
