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
import { DATE_FORMAT, RE_ONLY_NUMBER, GIO } from "../../utils/constants";
import { formatMoney } from "../../utils/commonFunction";

export default function EditVariant({
  variant,
  cb_delTable,
  cb_setTable,
}: any) {
  const [options, setoptions] = useState<any>(
    Object.keys(GIO).map((key) => {
      return {
        label: (
          <div className="opt-lbl">
            <span>{key}</span>
          </div>
        ),
        value: key,
      };
    })
  );
  //   const [label, setLabel] = useState<any>("BAP_CUON");

  return (
    <div className="w300px Variant__comp">
      <Select
        style={{ width: 94 }}
        className="country__select mr2px w200px"
        options={options}
        value={variant?.label}
        onChange={(val) => {
          cb_setTable(variant?.id, "label", val);

          //   Object.keys(GIO).map((key) => {
          //     if (val === key) {
          //       setPrice(GIO[key]);
          //     }
          //   });

          //   setLabel(val);
        }}
      />

      <div className="mb-4">
        <label htmlFor="product_price" className="form-label">
          Price
        </label>
        <input
          type="number"
          placeholder="Price"
          className="form-control"
          id="product_price"
          readOnly
          value={variant?.price}
          onChange={(e) => {}}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="product_price" className="form-label">
          SỐ LƯỢNG
        </label>
        <input
          //   type="number"
          placeholder="so luong"
          className="form-control"
          id="product_price"
          required
          value={formatMoney(variant?.quantity)}
          onChange={(e) => {
            let numInput = e.target.value;
            numInput = numInput.replaceAll(",", "");
            if (numInput.length < 7)
              if (!numInput || numInput.match(RE_ONLY_NUMBER)) {
                cb_setTable(variant?.id, "quantity", +numInput);
              }
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          cb_delTable(variant?.id);
        }}
      >
        xoa
      </button>
    </div>
  );
}
