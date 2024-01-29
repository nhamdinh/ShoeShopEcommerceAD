import "./style.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
  Checkbox,
} from "antd";
import moment from "moment";
import {
  DATE_FORMAT,
  RE_ONLY_NUMBER,
  GIO,
  GIO_BUY,
  GIO_RENDER,
} from "../../utils/constants";
import Variant from "./Variant";
import {
  useCreateThudungGioMutation,
  useGetThudungGiosQuery,
} from "../../store/components/thudungGios/thudungGiosApi";
import { openToast } from "../../store/components/customDialog/toastSlice";
import { useDispatch } from "react-redux";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import type { CheckboxProps } from "antd";

export default function ExportGio({ isBan }: any) {
  const dispatch = useDispatch();
  const [value, setValue] = useState<any>(2);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [sellDate, setSellDate] = useState<any>(
    moment(new Date()).format(DATE_FORMAT)
  );
  const [buyName, setBuyName] = useState<any>("");
  const [isGif, setisGif] = useState<any>(false);
  const [address, setaddress] = useState<any>("");
  const [phone, setphone] = useState<any>("");
  const [metadata, setmetadata] = useState<any>("");

  const [dataTable, setDataTable] = useState<any>([]);
  //   console.log(dataTable);
  const [displayFrom, setDisplayFrom] = useState<any>(
    moment(new Date(Date.now()), DATE_FORMAT)
  );
  const onChangeDateStart: DatePickerProps["onChange"] = (date, dateString) => {
    // setStartTime(new Date(dateString).toJSON());
    setSellDate(dateString);
  };
  const isValid = () => {
    if (isBan) return 1 && buyName && dataTable.length > 0;
    if (!isBan) return 1 && dataTable.length > 0;
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (isValid())
      onCreateThudungGio({
        newModel: {
          isBan,
          isGif,
          buyName: buyName ? buyName : "DUNG",
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
  const [createThudungGio, { isLoading: aa, error: bb }] =
    useCreateThudungGioMutation();

  const reset = () => {
    setDataTable([]);
    setBuyName("");
    setSellDate(moment(new Date()).format(DATE_FORMAT));
    setDisplayFrom(moment(new Date(Date.now()), DATE_FORMAT));
    setisGif(false);
    setValue(2);
    setaddress("");
    setphone("");
    setmetadata("");
  };

  const onCreateThudungGio = async (values: any) => {
    const res = await createThudungGio(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      reset();

      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Added ĐƠN Success",
          step: 1,
        })
      );
    } else {
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Add ĐƠN Failed",
          step: 2,
        })
      );
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">{isBan ? "Xuất Đơn" : "Nhập Hàng"}</h2>
        <div></div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white "></header>

        <div className="card-body">
          <button
            type="submit"
            className={`btn btn-success ${isValid() ? "" : "cursor__not"}`}
            onClick={submitHandler}
            disabled={!isValid()}
          >
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
                ...dataTable,
                {
                  id: Date.now(),
                  label: "BAP_CUON",
                  price: isBan ? GIO["BAP_CUON"] : GIO_BUY["BAP_CUON"],
                  quantity: 1,
                },
              ]);
            }}
          >
            THÊM
          </button>
          <div className="mt20px dataTable">
            {dataTable.map((variant: any) => {
              return (
                <Variant
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
                ></Variant>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
