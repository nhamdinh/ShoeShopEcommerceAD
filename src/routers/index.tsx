import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/LoginScreen";
import ProductScreen from "../screens/ProductScreen";
import UsersScreen from "../screens/UsersScreen";

export const PrivateRoutes = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  // {
  //   path: "/search/:keyword",
  //   element: <HomeScreen />,
  // },
  {
    path: "/users",
    element: <UsersScreen />,
  },
  {
    path: "/products",
    element: <ProductScreen />,
  },
  // {
  //   path: "/profile",
  //   element: <ProfileScreen />,
  // },
  // {
  //   path: "/shipping",
  //   element: <ShippingScreen />,
  // },
  // {
  //   path: "/payment",
  //   element: <PaymentScreen />,
  // },
  // {
  //   path: "/placeorder",
  //   element: <PlaceOrderScreen />,
  // },
  // {
  //   path: "/order/:id",
  //   element: <OrderScreen />,
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
];
