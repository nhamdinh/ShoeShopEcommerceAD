import React, { useEffect, useState } from "react";
import { formatMoney, formatMoneyCurrency } from "../../utils/commonFunction";
import { useGetProductsQuery } from "../../store/components/products/productsApi";
import { useNavigate } from "react-router-dom";

const TopTotal = ({ orders }: any) => {
  const navigate = useNavigate();

  const [products, setdataFetched] = useState<any>([]);
  const { data, error, isSuccess, isLoading } = useGetProductsQuery(
    {
      page: 1,
      limit: 1000,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setdataFetched(data?.products);
    }
  }, [data]);

  const [totalSale, settotalSale] = useState<any>(0);
  useEffect(() => {
    let totalSale_temp = 0;
    if (orders) {
      orders.map((order: any) =>
        order.isPaid === true
          ? (totalSale_temp = +totalSale_temp + +order.totalPrice)
          : null
      );
    }
    settotalSale(totalSale_temp);
  }, [orders]);

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6>{" "}
              <span>$ {formatMoneyCurrency(totalSale)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article
            className="icontext"
            onClick={() => {
              navigate("/orders");
            }}
          >
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Orders</h6>
              {orders ? (
                <span>{formatMoney(orders.length)}</span>
              ) : (
                <span>0</span>
              )}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article
            className="icontext"
            onClick={() => {
              navigate("/products");
            }}
          >
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Products</h6>
              {products ? (
                <span>{formatMoney(products?.length)}</span>
              ) : (
                <span>0</span>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
