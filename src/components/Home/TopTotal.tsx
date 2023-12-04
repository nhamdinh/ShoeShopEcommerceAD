import React, { useEffect, useState } from "react";
import { formatMoney, formatMoneyCurrency } from "../../utils/commonFunction";
import { useGetProductsQuery } from "../../store/components/products/productsApi";
import { useNavigate } from "react-router-dom";

const TopTotal = ({ orders, userInfo }: any) => {
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
      let prs = data?.metadata?.products?.filter((product: any) => {
        // console.log(product)
        if (product?.product_shop?._id === userInfo?._id) {
          return product;
        }
      });
      setdataFetched(prs);
    }
  }, [data]);

  const [totalSale, settotalSale] = useState<any>(0);
  useEffect(() => {
    if (orders) {
      let totalSale_temp = orders.reduce((acc: number, order: any) => {
        return +acc + (order.isPaid === true ? +order.totalAmountPay : 0);
      }, 0);

      settotalSale(totalSale_temp);
    }
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
