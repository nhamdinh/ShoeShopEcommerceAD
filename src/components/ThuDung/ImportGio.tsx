import {
  useGetThudungGiosQuery,
  useUpdatedOrderPayMutation,
} from "../../store/components/thudungGios/thudungGiosApi";
import { DATE_FORMAT, GIO, GIO_BUY } from "../../utils/constants";
import "./style.scss";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Col, Divider, Row } from "antd";
import { findUniqueElements, formatMoney } from "../../utils/commonFunction";
import { openToast } from "../../store/components/customDialog/toastSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  st_setArrBuy,
  st_setArrSell,
} from "../../store/components/thudungGios/thudungGiosSlice";

const style: React.CSSProperties = { background: "#FFFFFF", padding: "8px 0" };

export default function ImportGio({ isBan }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataTable, setDataTable] = useState<any>([]);
  const [dataSum, setDataSum] = useState<any>([]);
  const [show, setShow] = useState<any>(false);
  const [totalAmount, settotalAmount] = useState<any>(0);
  const [totalOrderNot, settotalOrderNot] = useState<any>(0);
  const {
    data: data1,
    error,
    isSuccess,
    isLoading,
  } = useGetThudungGiosQuery(
    { isBan },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      const _dataTable = data1?.metadata?.thuDungGios;
      const allItems: any = [];
      _dataTable.map((item: any) => {
        item?.orderItems.map((item1: any) => {
          allItems.push({ ...item1 });
        });
      });

      const _dataSum = allItems
        .reduce((acc: any, item: any) => {
          const isExist = acc.find((item1: any) => item1.label === item.label);
          if (isExist) {
            isExist.quantity = +isExist.quantity + +item.quantity;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, [])
        .sort((aa: any, bb: any) =>
          aa.label > bb.label ? 1 : aa.label < bb.label ? -1 : 0
        );

      const keys = _dataSum.reduce((acc: any, item: any) => {
        acc.push(item.label);
        return acc;
      }, []);
      // console.log(keys);

      findUniqueElements(Object.keys(GIO), keys).map(
        (item: any, index: any) => {
          _dataSum.push({
            id: Date.now() + index,
            label: item,
            price: isBan ? GIO[item] : GIO_BUY[item],
            quantity: 0,
          });
        }
      );
      if (isBan) {
        dispatch(
          st_setArrSell({
            arrSell: [..._dataSum],
          })
        );
      } else {
        dispatch(
          st_setArrBuy({
            arrBuy: [..._dataSum],
          })
        );
      }

      setDataSum(_dataSum);

      let _totalOrderNot = 0;
      settotalAmount(
        _dataTable.reduce(
          (acc: any, item1: any) => {
            if (item1?.isPaid) {
              const totalOrder = item1?.orderItems.reduce(
                (acc: any, item22: any) => {
                  acc = +acc + +item22.price * +item22.quantity;
                  return acc;
                },
                [0]
              );
              return (acc = +acc + +totalOrder);
            } else {
              const not = item1?.orderItems.reduce(
                (acc: any, item22: any) => {
                  acc = +acc + +item22.price * +item22.quantity;
                  return acc;
                },
                [0]
              );

              _totalOrderNot = +not + +_totalOrderNot;
              return acc;
            }
          },
          [0]
        )
      );
      settotalOrderNot(_totalOrderNot);
      setDataTable(_dataTable);
    }
  }, [data1]);

  const [updatedOrderPay, { isLoading: aa, error: bb }] =
    useUpdatedOrderPayMutation();

  const onUpdatedOrderPay = async (values: any) => {
    const res = await updatedOrderPay(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      console.log(data);
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "updated ĐƠN Success",
          step: 1,
        })
      );
    } else {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "updated ĐƠN Failed",
          step: 2,
        })
      );
    }
  };

  return (
    <section className="content-main">
      <div className="content-header ">
        <h2
          className="content-title df"
          onClick={() => {
            // setParams({ ...params, brand: "", keyword: "" });
            // setbrand("All category");
            // setKeyword("");
            // setValue("");
            // navigate("/products");
          }}
        >
          <div>DANH SÁCH ĐƠN{isBan ? " BÁN" : " NHẬP"}</div>
          <button
            type="submit"
            onClick={() => {
              setShow(!show);
            }}
            className="btn btn-primary"
            // disabled={!isValid()}
          >
            show{" "}
          </button>
          <div className={show ? "df" : "dn"}>
            <div className="color__ff4545">{data1?.metadata?.totalCount}</div>
            <div> | {formatMoney(totalAmount)} + </div>
            <div className="color__ff4545">{formatMoney(totalOrderNot)}</div>
            <div> = {formatMoney(+totalOrderNot + +totalAmount)}</div>
            {/* {t("Products")} */}
          </div>
        </h2>
      </div>

      <div className="card mb-4 shadow-sm">
        {/*         <header className="card-header bg-white "></header>
         */}
        <div className="card-body">
          {dataTable.map((item: any, index: number) => {
            const totalOrder = item?.orderItems.reduce(
              (acc: any, item: any) => {
                acc = +acc + +item.price * +item.quantity;
                return acc;
              },
              [0]
            );
            return (
              <div key={item?._id} className="mt20px">
                <Row gutter={16} key={item?._id} className="mt20px">
                  <Col className="gutter-row" span={6}>
                    <h5 style={style}> {index + 1}.</h5>
                  </Col>
                  <Col
                    onClick={() => {
                      navigate(`/thudung-list/${item?._id}`);
                    }}
                    className="gutter-row cursor__pointer"
                    span={6}
                  >
                    <div style={style}>{item?.buyName}</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>
                      {moment(item?.sellDate).format(DATE_FORMAT)}
                    </div>
                  </Col>
                  <Col className="gutter-row df content__end" span={6}>
                    <button
                      type="submit"
                      onClick={() => {
                        onUpdatedOrderPay({ id: item?._id });
                      }}
                      className={`btn  ${
                        item?.isPaid ? "btn-success" : "btn-warning"
                      }`}
                      // disabled={!isValid()}
                    >
                      {item?.isPaid ? "RỒI " : "CHƯA "}THANH TOÁN
                    </button>
                  </Col>
                </Row>
                {item?.orderItems.map((item: any, index: number) => {
                  return (
                    <Row key={index} gutter={16} className="mt20px">
                      <Col className="gutter-row" span={6}>
                        <h5 style={style}>{item.label}</h5>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div style={style}>{item.quantity}</div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div style={style}>{item.price}</div>
                      </Col>
                      <Col className="gutter-row df content__end" span={6}>
                        <div style={style}>
                          {formatMoney(+item.price * +item.quantity)}
                        </div>
                      </Col>
                    </Row>
                  );
                })}
                <Row gutter={16} className="mt20px">
                  <Col className="gutter-row" span={6}>
                    <h5 style={style}></h5>
                  </Col>
                  <Col className="gutter-row" span={6}></Col>
                  <Col className="gutter-row" span={6}></Col>
                  <Col className="gutter-row df content__end" span={6}>
                    <div style={style}>{formatMoney(totalOrder)}</div>
                  </Col>
                </Row>
                <Divider orientation="left"></Divider>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
