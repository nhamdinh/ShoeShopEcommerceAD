import "./style.scss";
import React, { useState } from "react";
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
  notification,
} from "antd";
import moment from "moment";
import { DATE_FORMAT, RE_ONLY_NUMBER } from "../../utils/constants";
import Variant from "./Variant";

const gio: any = {
  thuong: 170,
  vip: 210,
  cuonBap: 270,
  Bap: 270,
  van: 280,
};

export default function ExportGio() {
  const [sellDate, setSellDate] = useState<any>(
    moment(new Date()).format(DATE_FORMAT)
  );
  const [buyName, setBuyName] = useState<any>("");

  const [dataTable, setDataTable] = useState<any>([]);
  //   console.log(dataTable);
  const [displayFrom, setDisplayFrom] = useState<any>(
    moment(new Date(Date.now()), DATE_FORMAT)
  );
  const onChangeDateStart: DatePickerProps["onChange"] = (date, dateString) => {
    // setStartTime(new Date(dateString).toJSON());
    setSellDate(dateString);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(dataTable);
    // onCreateProduct({
    //   name,
    //   price,
    //   description,
    //   image,
    //   countInStock,
    //   category: {
    //     name: categor,
    //     brand: brand,
    //   },
    // });
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Add product</h2>
        <div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={submitHandler}
          >
            Publish now
          </button>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white "></header>

        <div className="card-body">
          <div className="mb-4">
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
            <label htmlFor="product_title" className="form-label">
              {/* Product title */}
            </label>
            <input
              type="text"
              placeholder="ten"
              className="form-control"
              id="product_title"
              required
              value={buyName}
              onChange={(e) => setBuyName(e.target.value)}
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
                  label: "cuonBap",
                  price: 270,
                  quantity: "1",
                  isPaid: true,
                  isDelivered: true,
                  metadata: "",
                },
              ]);
            }}
          >
            Them
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
                          Object.keys(gio).map((key) => {
                            if (val === key) {
                              final["price"] = gio[key];
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
