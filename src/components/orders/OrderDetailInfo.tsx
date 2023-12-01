import React from "react";
import { formatCustomerPhoneNumber } from "../../utils/commonFunction";

const OrderDetailInfo = ({ order }: any) => {
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Customer</h6>
            <p className="mb-1">
              {order?.userId?.name}-- 
              {formatCustomerPhoneNumber(order?.userId?.phone)}<br />
              <a href={`mailto:${order?.userId?.email}`}>{order?.userId?.email}</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Order info</h6>
            <p className="mb-1">
              Shipping: {order?.shippingAddress?.street} <br /> Pay method:{" "}
              {order?.paymentMethod}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Deliver to</h6>
            <p className="mb-1">
              Address: {order?.shippingAddress?.city}
              <br />
              {order?.shippingAddress?.street}
              <br /> {order?.shippingAddress?.postalCode}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
