import {
  useGetThudungGiosQuery,
  useUpdatedOrderPayMutation,
} from "../../store/components/thudungGios/thudungGiosApi";
import { GIO, GIO_BUY, GIO_RENDER, PAGE_SIZE_10 } from "../../utils/constants";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Select, Spin } from "antd";
import { findUniqueElements, formatMoney } from "../../utils/commonFunction";
import { openToast } from "../../store/components/customDialog/toastSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminPagination from "../adminPagination/AdminPagination";
import { Input } from "antd";

const style: React.CSSProperties = { background: "#FFFFFF", padding: "8px 0" };

const options = [
  {
    label: (
      <div className="opt-lbl">
        <span>All</span>
      </div>
    ),
    value: 0,
  },
  {
    label: (
      <div className="opt-lbl">
        <span>Chưa</span>
      </div>
    ),
    value: -1,
  },
  {
    label: (
      <div className="opt-lbl">
        <span>Rồi</span>
      </div>
    ),
    value: 1,
  },
];

export default function ImportGio({ isBan }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [keySearch, setKeySearch] = useState<any>("");
  const [params, setParams] = useState<any>({
    limit: PAGE_SIZE_10,
    offset: 0,
    isPaid: 0,
    keySearch,
  });
  const [goSearch, setGoSearch] = useState<any>(new Date().getTime());

  const [dataTable, setDataTable] = useState<any>([]);
  const [dataTableRender, setDataTableRender] = useState<any>([]);
  const [show, setShow] = useState<any>(false);
  const [totalObj, setTotalObj] = useState<any>({
    totalAmountPaid: 0,
    totalAmountUnPaid: 0,
    discount: 0,
  });

  const {
    data: data1,
    error,
    isSuccess,
    isLoading,
  } = useGetThudungGiosQuery(
    {
      isBan,
      limit: 1000,
      skip: 0,
      isPaid: params.isPaid,
      keySearch: params.keySearch,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    const _dataTableRender: any = [];

    for (
      let i = params.offset;
      i < dataTable.length && i < +params.offset + +params.limit;
      i++
    ) {
      _dataTableRender.push(dataTable[i]);
    }

    setDataTableRender(_dataTableRender);
  }, [dataTable, params]);

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

      findUniqueElements(Object.keys(GIO_RENDER), keys).map(
        (item: any, index: any) => {
          _dataSum.push({
            id: Date.now() + index,
            label: item,
            price: isBan ? GIO[item] : GIO_BUY[item],
            quantity: 0,
          });
        }
      );

      const _dataTableKoBieu = _dataTable.filter((item: any) => !item?.isGif);
      const _totalObj = {
        totalAmountPaid: 0,
        totalAmountUnPaid: 0,
        discount: 0,
      };
      _dataTableKoBieu.map((item1: any) => {
        _totalObj.discount = +_totalObj.discount + +(item1?.discount ?? 0);
        if (item1?.isPaid) {
          const amountPaid = item1?.orderItems.reduce(
            (acc22: any, item22: any) => {
              acc22 = +acc22 + +item22.price * +item22.quantity;
              return acc22;
            },
            [0]
          );
          _totalObj.totalAmountPaid = +_totalObj.totalAmountPaid + +amountPaid;
        } else {
          const amountUnPaid = item1?.orderItems.reduce(
            (acc22: any, item22: any) => {
              acc22 = +acc22 + +item22.price * +item22.quantity;
              return acc22;
            },
            [0]
          );
          _totalObj.totalAmountUnPaid =
            +_totalObj.totalAmountUnPaid + +amountUnPaid;
        }
      });
      setTotalObj(_totalObj);
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
      // console.log(data);
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

  const onSearch = (key: string, val: any) => {
    const final = { ...params, limit: PAGE_SIZE_10, offset: 0 };
    final[key] = val;
    setParams(final);

    setCurrentPage(1);
  };
  let countdown: any = null;

  useEffect(() => {
    clearTimeout(countdown);
    countdown = setTimeout(() => {
      onSearch("keySearch", keySearch);
    }, 600);

    return () => {
      clearTimeout(countdown);
    };
  }, [keySearch]);

  return (
    <section className="content-main">
      <div className="content-header ">
        <h2 className="content-title df" onClick={() => {}}>
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
        </h2>
      </div>
      <h5 className={show ? "df" : "dn"}>
        <div className="color__ff4545">
          {
            data1?.metadata?.thuDungGios.filter((item: any) => !item?.isGif)
              .length
          }
          /{data1?.metadata?.totalCount}
        </div>
        <div> | {formatMoney(totalObj?.totalAmountPaid)} + </div>
        <div className="color__ff4545">
          {formatMoney(totalObj?.totalAmountUnPaid)} -
        </div>
        <div className="color__green">{formatMoney(totalObj?.discount)} =</div>
        <div>
          {formatMoney(
            +totalObj?.totalAmountUnPaid +
              +totalObj?.totalAmountPaid -
              +totalObj?.discount
          )}
        </div>
        {/* {t("Products")} */}
      </h5>
      <div className="df items__center mt10px">
        <h4 className="mb0px">THANH TOÁN</h4>
        <Select
          style={{ width: 94 }}
          className="country__select mr2px w200px"
          options={options}
          value={params.isPaid}
          onChange={(val) => {
            onSearch("isPaid", val);
            // cb_setTable(variant?.id, "label", val);
            //   Object.keys(GIO).map((key) => {
            //     if (val === key) {
            //       setPrice(GIO[key]);
            //     }
            //   });
            //   setLabel(val);
          }}
        />
      </div>
      <div className="input-group df items__center mt10px">
        <Input
          className="form-control rounded search w250px"
          type="search"
          placeholder="search"
          allowClear
          value={keySearch}
          onChange={(e) => {
            setKeySearch(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch("keySearch", keySearch);
            }
          }}
        />

        <button
          type="submit"
          onClick={() => {
            onSearch("keySearch", keySearch);
          }}
          className="search-button h36px w100px"
        >
          search
        </button>
      </div>
      <div className="card mb-4 shadow-sm mt10px">
        {/*         <header className="card-header bg-white "></header>
         */}
        <AdminPagination
          dataCount={data1?.metadata?.totalCount}
          params={params}
          currentPage={currentPage}
          cb_setCurrentPage={(val: any) => {
            setCurrentPage(val);
          }}
          cb_setParams={(val: any) => {
            setParams(val);
          }}
          cb_setGoSearch={(val: any) => {
            setGoSearch(val);
          }}
        ></AdminPagination>
        <div className="card-body">
          {dataTableRender.map((item: any, index: number) => {
            let totalOrder = 0;
            if (!item?.isGif) {
              totalOrder = item?.orderItems.reduce(
                (acc: any, item: any) => {
                  acc = +acc + +item.price * +item.quantity;
                  return acc;
                },
                [0]
              );
            }
            return (
              <div key={item?._id} className="mt20px">
                <Row gutter={16} key={item?._id} className="mt20px">
                  <Col className="gutter-row" span={8}>
                    <h5 style={style}> {index + 1 + +params.offset}.</h5>
                  </Col>
                  <Col
                    onClick={() => {
                      navigate(
                        `/thudung-list/${item?._id}?isBan=${item?.isBan}`
                      );
                    }}
                    className="gutter-row cursor__pointer"
                    span={4}
                  >
                    <div style={style}>{item?.buyName}</div>
                  </Col>
                  <Col className="gutter-row" span={4}>
                    <h5 className="mb0px text__underline" style={style}>
                      {item?.metadata}
                    </h5>
                  </Col>
                  <Col className="gutter-row df content__end" span={8}>
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
                      {aa && <Spin size="large"></Spin>}

                      {item?.isPaid ? "RỒI PAY" : "CHƯA PAY"}
                    </button>
                  </Col>
                </Row>
                {item?.orderItems.map((item: any, ind: number) => {
                  return (
                    <Row key={ind} gutter={16} className="mt20px">
                      <Col className="gutter-row" span={8}>
                        <h6 style={style}>
                          {index + 1 + +params.offset}.{ind + 1}.
                          {GIO_RENDER[item.label]}
                        </h6>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div style={style}>{item.quantity}</div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div style={style}>{item.price}</div>
                      </Col>
                      <Col className="gutter-row df content__end" span={8}>
                        <div style={style}>
                          {formatMoney(+item.price * +item.quantity)}
                        </div>
                      </Col>
                    </Row>
                  );
                })}
                <Row gutter={16} className="mt20px">
                  <Col className="gutter-row" span={8}>
                    <h5 style={style}></h5>
                  </Col>
                  <Col className="gutter-row" span={4}></Col>
                  <Col className="gutter-row" span={4}></Col>
                  <Col className="gutter-row df content__end" span={8}>
                    <h5 className="df " style={style}>
                      <div>{formatMoney(totalOrder)} -</div>
                      <div className="color__green df">
                        {formatMoney(item?.discount)} =
                      </div>
                      <div>{formatMoney(+totalOrder - +item?.discount)}</div>
                    </h5>
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
