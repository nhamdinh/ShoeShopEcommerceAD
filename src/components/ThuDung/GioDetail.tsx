import {
  useFindThuDungGioByIdMutation,
  useUpdatedOrderByIdMutation,
} from "../../store/components/thudungGios/thudungGiosApi";
import "./style.scss";
import { useEffect, useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";
import {
  DATE_FORMAT,
  RE_ONLY_NUMBER,
  GIO,
  GIO_RENDER,
  GIO_BUY,
} from "../../utils/constants";
import EditVariant from "./EditVariant";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { openToast } from "../../store/components/customDialog/toastSlice";
import type { CheckboxProps } from "antd";

import { Checkbox, Spin } from "antd";

export default function GioDetail() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const [orderId, setorderId] = useState<any>("");
  const [isBan, setisBan] = useState<any>(true);
  const [orderDetail, setorderDetail] = useState<any>({});
  const [findThuDungGioById, { isLoading: aa, error: bb }] =
    useFindThuDungGioByIdMutation();

  const onFindThuDungGioById = async (values: any) => {
    const res = await findThuDungGioById(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      const _orderDetail = data?.metadata;
      setDisplayFrom(moment(new Date(sellDate), DATE_FORMAT));
      setSellDate(_orderDetail?.sellDate);
      setBuyName(_orderDetail?.buyName);
      setaddress(_orderDetail?.address);
      setphone(_orderDetail?.phone);
      setmetadata(_orderDetail?.metadata);
      setDiscount(_orderDetail?.discount ?? 0);
      setValue(_orderDetail?.isPaid ? 1 : 2);
      setDataTable(_orderDetail?.orderItems);
      setisBan(_orderDetail?.isBan);
      setisGif(_orderDetail?.isGif ?? false);
      setorderDetail(_orderDetail);
    } else {
    }
  };

  useEffect(() => {
    if (location.pathname.split("/")?.length > 2) {
      const _orderId = location.pathname.split("/")[2];
      onFindThuDungGioById({ id: _orderId });
      setorderId(_orderId);
    }
  }, [location.pathname]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  //   console.log(dataTable);
  const [displayFrom, setDisplayFrom] = useState<any>(
    moment(new Date(Date.now()), DATE_FORMAT)
  );
  const [sellDate, setSellDate] = useState<any>(
    moment(new Date()).format(DATE_FORMAT)
  );
  const [isGif, setisGif] = useState<any>(false);

  const [buyName, setBuyName] = useState<any>("");
  const [address, setaddress] = useState<any>("");
  const [phone, setphone] = useState<any>("");
  const [metadata, setmetadata] = useState<any>("");
  const [discount, setDiscount] = useState<any>(0);

  const [value, setValue] = useState<any>(1);

  const [dataTable, setDataTable] = useState<any>([]);

  const onChangeDateStart: DatePickerProps["onChange"] = (date, dateString) => {
    // setStartTime(new Date(dateString).toJSON());
    setSellDate(dateString);
  };
  const isValid = () => {
    return 1 && buyName && dataTable.length > 0;
  };

  const [updatedOrderById, { isLoading: aa1, error: bb1 }] =
    useUpdatedOrderByIdMutation();

  const onUpdatedOrderById = async (values: any) => {
    const res = await updatedOrderById(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      console.log(data);
      navigate(-1);
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

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (isValid())
      onUpdatedOrderById({
        id: orderId,
        objectParams: {
          buyName,
          isGif,
          discount,
          sellDate,
          metadata,
          address,
          phone,
          isPaid: value === 1 ? true : false,
          isDelivered: true,
          orderItems: [...dataTable],
        },
      });
  };
  const onChange1: CheckboxProps["onChange"] = (e) => {
    setisGif(e.target.checked);
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">
          CHI TIẾT ĐƠN{" "}
          {location.search.split("=")[1] === "true" ? " BÁN" : " NHẬP"}
        </h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <button
            type="submit"
            className={`btn btn-success ${isValid() ? "" : "cursor__not"}`}
            onClick={submitHandler}
            disabled={!isValid()}
          >
            {aa1 && <Spin size="large"></Spin>}
            Publish now
          </button>
          <div className="mb-4 mt20px">
            <label htmlFor="product_title" className="form-label">
              {/* Product title */}
            </label>
            <DatePicker
              allowClear={false}
              defaultValue={displayFrom}
              onChange={onChangeDateStart}
            />
          </div>
          <div className="mb-4">
            <h6 className="form-label">TÊN</h6>
            <input
              type="text"
              placeholder="TÊN"
              className="form-control"
              id="product_title"
              required
              value={buyName}
              onChange={(e) => setBuyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h5 className="form-label">BIẾU</h5>
            <div>
              <Checkbox checked={isGif} onChange={onChange1}>
                BIẾU
              </Checkbox>
            </div>
          </div>
          <div className="mb-4">
            <h6 className="form-label">THANH TOÁN</h6>
            <div>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>RỒI</Radio>
                <Radio value={2}>CHƯA</Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="form-label">ĐỊA CHỈ</h6>
            <input
              type="text"
              placeholder="ĐỊA CHỈ"
              className="form-control"
              id="product_title"
              required
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <h6 className="form-label">SĐT</h6>
            <input
              type="text"
              placeholder="SĐT"
              className="form-control"
              id="product_title"
              required
              value={phone}
              onChange={(e) => {
                let numInput = e.target.value;
                if (numInput.length < 13)
                  if (!numInput || numInput.match(RE_ONLY_NUMBER)) {
                    setphone(e.target.value);
                  }
              }}
            />
          </div>
          <div className="mb-4">
            <h6 className="form-label">GIẢM GIÁ</h6>
            <input
              type="number"
              placeholder="GIẢM GIÁ"
              className="form-control"
              id="product_title"
              required
              value={discount}
              onChange={(e) => {
                const numInput = e.target.value;
                if (numInput.length < 7)
                  if (!numInput || numInput.match(RE_ONLY_NUMBER)) {
                    setDiscount(e.target.value);
                  }
              }}
            />
          </div>
          <div className="mb-4">
            <h6 className="form-label">NOTE</h6>
            <input
              type="text"
              placeholder="NOTE"
              className="form-control"
              id="product_title"
              required
              value={metadata}
              onChange={(e) => {
                setmetadata(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            onClick={() => {
              setDataTable([
                {
                  id: Date.now(),
                  label: "BAP_CUON",
                  price: isBan ? GIO["BAP_CUON"] : GIO_BUY["BAP_CUON"],
                  quantity: 1,
                },
                ...dataTable,
              ]);
            }}
          >
            THÊM
          </button>
          <div className="mt20px dataTable">
            {dataTable.map((variant: any) => {
              return (
                <EditVariant
                  key={variant?.id}
                  variant={variant}
                  cb_delTable={(id: any) => {
                    setDataTable(
                      dataTable.filter((row: any) => row?.id !== id)
                    );
                  }}
                  cb_setTable={(id: any, key: any, val: any) => {
                    setDataTable(
                      dataTable.map((row: any) => {
                        const final: any = { ...row };
                        if (row.id === id) {
                          final[key] = val;
                          Object.keys(GIO_RENDER).map((key) => {
                            if (val === key) {
                              final["price"] = isBan ? GIO[key] : GIO_BUY[key];
                            }
                          });
                        }
                        return final;
                      })
                    );
                  }}
                ></EditVariant>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
