import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetailScreen = () => {
  const location = useLocation();
  const [orderId, setorderId] = useState<any>(location.pathname.split("/")[2]);

  useEffect(() => {
    setorderId(location.pathname.split("/")[2]);
  }, [location.pathname]);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
