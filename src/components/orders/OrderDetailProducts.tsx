import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/commonFunction";

const OrderDetailProducts = ({ order, loading }: any) => {
  const [orderItems, setorderItems] = useState<any>([]);
  useEffect(() => {
    if (order?.orderItems) {
      setorderItems(order?.orderItems[0]?.itemProducts);
    }
  }, [order]);
  // if (!loading) {
  //   // Calculate Price
  //   const addDecimals = (num: number) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };

  //   order?.itemsPrice = addDecimals(
  //     order?.orderItems.reduce(
  //       (acc: any, item) => acc + item?.price * item?.qty,
  //       0
  //     )
  //   );
  // }
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {orderItems?.map((item: any, index: number) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item?.name}</div>
              </Link>
            </td>
            <td>${item?.price} </td>
            <td>{item?.quantity} </td>
            <td className="text-end"> ${item?.quantity * item?.price}</td>
          </tr>
        ))}

        <tr>
          <td colSpan={4}>
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>${formatMoney(order?.totalAmount)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Discount total :</dt>{" "}
                <dd>${formatMoney(order?.totalDiscount)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>${formatMoney(order?.feeShip)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tax cost:</dt> <dd>${formatMoney(order?.taxPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">${formatMoney(order?.totalAmountPay)}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order?.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
