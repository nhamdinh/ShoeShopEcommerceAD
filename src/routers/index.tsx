import AddProduct from "../screens/AddProduct";
import CategoriesScreen from "../screens/CategoriesScreen";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/LoginScreen";
import NotFound from "../screens/NotFound";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderScreen from "../screens/OrderScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import ProductScreen from "../screens/ProductScreen";
import ReviewScreen from "../screens/ReviewScreen";
import ThuDungScreenAdd from "../screens/ThuDungScreenAdd";
import ThuDungScreenBuy from "../screens/ThuDungScreenBuy";
import ThuDungScreenDetail from "../screens/ThuDungScreenDetail";
import ThuDungScreenList from "../screens/ThuDungScreenList";
import ThuDungScreenListBuy from "../screens/ThuDungScreenListBuy";
import ThuDungScreenSum from "../screens/ThuDungScreenSum";
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
    path: "/thudung-create",
    element: <ThuDungScreenAdd />,
  },
  {
    path: "/thudung-create-buy",
    element: <ThuDungScreenBuy />,
  },
  {
    path: "/thudung-list",
    element: <ThuDungScreenList />,
  },
  {
    path: "/thudung-list-buy",
    element: <ThuDungScreenListBuy />,
  },
  {
    path: "/thudung-sum",
    element: <ThuDungScreenSum />,
  },
  {
    path: "/thudung-list/:id",
    element: <ThuDungScreenDetail />,
  },
  {
    path: "/products",
    element: <ProductScreen />,
  },
  {
    path: "/orders",
    element: <OrderScreen />,
  },
  {
    path: "/order/:id",
    element: <OrderDetailScreen />,
  },
  {
    path: "/product/:id/edit",
    element: <ProductEditScreen />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/category",
    element: <CategoriesScreen />,
  },
  {
    path: "/reviews",
    element: <ReviewScreen />,
  },
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
  {
    path: "*",
    element: <NotFound />,
  },
];
