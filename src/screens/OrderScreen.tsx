import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OrderMain from "../components/orders/OrderMain";

const OrderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain />
      </main>
    </>
  );
};

export default OrderScreen;
