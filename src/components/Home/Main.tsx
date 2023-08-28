import React, { useEffect, useState } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useGetOrderAdQuery } from "../../store/components/orders/ordersApi";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation();

  const [orders, setorders] = useState<any>([]);

  const {
    data: dataFetch,
    error,
    isSuccess,
    isLoading,
  } = useGetOrderAdQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setorders(dataFetch);
    }
  }, [dataFetch]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">{t("Dashboard")}</h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} isLoading={isLoading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
