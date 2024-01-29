import {
  useGetThudungGiosQuery,
  useUpdatedOrderPayMutation,
} from "../../store/components/thudungGios/thudungGiosApi";
import { DATE_FORMAT, GIO, GIO_BUY, GIO_RENDER } from "../../utils/constants";
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
import { Table, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  id?: string;
  // key: React.Key;
  // name: string;
  // age: number;
  // address: string;
}
const style: React.CSSProperties = { background: "#FFFFFF", padding: "8px 0" };

export default function SumGio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataTable, setDataTable] = useState<any>([]);
  const [dataSumBuy, setDataSumBuy] = useState<any>([]);
  const [countSumBuy, setCountDataSumBuy] = useState<any>(0);
  const [dataSumSell, setDataSumSell] = useState<any>([]);
  const [countSumSell, setCountDataSumSell] = useState<any>(0);

  const [show, setShow] = useState<any>(false);
  const [totalAmount, settotalAmount] = useState<any>(0);
  const [totalOrderNot, settotalOrderNot] = useState<any>(0);
  const {
    data: dataSell,
    error: errorSell,
    isSuccess: isSuccessSell,
    isLoading: isLoadingSell,
  } = useGetThudungGiosQuery(
    { isBan: true },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const {
    data: dataBuy,
    error: errorBuy,
    isSuccess: isSuccessBuy,
    isLoading: isLoadingBuy,
  } = useGetThudungGiosQuery(
    { isBan: false },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccessSell) {
      const _dataTable = dataSell?.metadata?.thuDungGios;
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

      findUniqueElements(Object.keys(GIO_RENDER), keys).map(
        (item: any, index: any) => {
          _dataSum.push({
            id: Date.now() + index,
            label: item,
            price: GIO[item],
            quantity: 0,
          });
        }
      );
      setCountDataSumSell(
        _dataSum.reduce((acc: any, item: any) => +acc + +item.quantity, [0])
      );

      setDataSumSell(
        _dataSum.sort((aa: any, bb: any) =>
          aa.label > bb.label ? 1 : aa.label < bb.label ? -1 : 0
        )
      );
      //   setDataSum(_dataSum);

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
  }, [dataSell]);

  useEffect(() => {
    if (isSuccessBuy) {
      const _dataTable = dataBuy?.metadata?.thuDungGios;
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

      findUniqueElements(Object.keys(GIO_RENDER), keys).map(
        (item: any, index: any) => {
          _dataSum.push({
            id: Date.now() + index,
            label: item,
            price: GIO_BUY[item],
            quantity: 0,
          });
        }
      );
      setCountDataSumBuy(
        _dataSum.reduce((acc: any, item: any) => +acc + +item.quantity, [0])
      );
      setDataSumBuy(
        _dataSum.sort((aa: any, bb: any) =>
          aa.label > bb.label ? 1 : aa.label < bb.label ? -1 : 0
        )
      );
      //   setDataSum(_dataSum);

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
  }, [dataBuy]);

  const columns2: ColumnsType<DataType> = [
    {
      title: "quantity BÁN",
      dataIndex: "quantity",
      // ellipsis: true,
      align: "center",
    },

    // {
    //   title: "label",
    //   dataIndex: "label",
    //   ellipsis: true,
    //   align: "center",
    //   render: (label) => <>{GIO_RENDER[label]}</>,

    // },

    // {
    //   title: "price",
    //   dataIndex: "price",
    //   // ellipsis: true,
    //   align: "center",
    // },
    // {
    //   title: "No.",
    //   dataIndex: "id",
    //   key: "id",
    //   ellipsis: true,
    //   //   sorter: true,
    //   //   showSorterTooltip: false,
    //   align: "center",
    //   render: (_, __, index: any) => <>{index + 1}</>,
    // },
  ];

  const columns1: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      //   sorter: true,
      //   showSorterTooltip: false,
      align: "center",
      render: (_, __, index: any) => <>{index + 1}</>,
    },
    {
      title: "label",
      dataIndex: "label",
      ellipsis: true,
      align: "center",
      render: (label) => <>{GIO_RENDER[label]}</>,
    },

    // {
    //   title: "price",
    //   dataIndex: "price",
    //   // ellipsis: true,
    //   align: "center",
    // },
    {
      title: "quantity NHẬP",
      dataIndex: "quantity",
      // ellipsis: true,
      align: "center",
    },
  ];

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
          <div>TỔNG</div>
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
        </h2>
      </div>

      <div className="card mb-4 shadow-sm">
        {/*         <header className="card-header bg-white "></header>
         */}
        <div className="card-body">
          <Row gutter={16} className="mt20px">
            <Col className="gutter-row" span={18}>
              <h3>NHẬP</h3>
              <Table
                className="AdminManagement__table"
                // loading={isLoading}
                // style={{ maxWidth:1000 }}
                columns={columns1}
                dataSource={dataSumBuy}
                // scroll={{ x: 1000, y: 500 }}
                rowKey={(record) => `${record?.id}`}
                // rowSelection={{
                //   type: "checkbox",
                //   selectedRowKeys: selectedRows.map((item) => `${item?.id}`),
                //   onChange: (_, selectedRows) => {
                //     setSelectedRows(selectedRows);
                //   },
                //   getCheckboxProps: (record) => ({
                //     name: record?.id,
                //     value: `${record?.id}`,
                //   }),
                // }}
                // onChange={(_, __, sorter: any) => {
                //   setSearch((prev: any) => ({
                //     ...prev,
                //     order: prev.order === "desc" ? "asc" : "desc",
                //   }));
                // }}
                // pagination={{ pageSize: 1000 }}
                pagination={false}
              />
            </Col>
            <Col className="gutter-row " span={6}>
              <h3>BÁN</h3>
              <Table
                className="AdminManagement__table"
                // loading={isLoading}
                // style={{ maxWidth:1000 }}
                columns={columns2}
                dataSource={dataSumSell}
                // scroll={{ x: 1000, y: 500 }}
                rowKey={(record) => `${record?.id}`}
                // rowSelection={{
                //   type: "checkbox",
                //   selectedRowKeys: selectedRows.map((item) => `${item?.id}`),
                //   onChange: (_, selectedRows) => {
                //     setSelectedRows(selectedRows);
                //   },
                //   getCheckboxProps: (record) => ({
                //     name: record?.id,
                //     value: `${record?.id}`,
                //   }),
                // }}
                // onChange={(_, __, sorter: any) => {
                //   setSearch((prev: any) => ({
                //     ...prev,
                //     order: prev.order === "desc" ? "asc" : "desc",
                //   }));
                // }}
                // pagination={{ pageSize: 1000 }}
                pagination={false}
              />
            </Col>
          </Row>

          <Row gutter={16} className="mt20px">
            <Col className="gutter-row" span={12}></Col>
            <Col className="gutter-row " span={6}>
              <h4 className="df content__center">{countSumBuy}</h4>
            </Col>
            <Col className="gutter-row " span={6}></Col>
          </Row>
          <Row gutter={16} className="mt20px">
            <Col className="gutter-row" span={12}></Col>
            <Col className="gutter-row " span={6}></Col>
            <Col className="gutter-row " span={6}>
              <h4 className="df content__center">{countSumSell}</h4>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
