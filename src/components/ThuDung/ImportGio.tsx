import "./style.scss";
import React from "react";
export default function ImportGio() {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2
          className="content-title"
          onClick={() => {
            // setParams({ ...params, brand: "", keyword: "" });
            // setbrand("All category");
            // setKeyword("");
            // setValue("");
            // navigate("/products");
          }}
        >
          {/* {t("Products")} */}NHẬP GIÒ
        </h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white "></header>

        <div className="card-body">zzz</div>
      </div>
    </section>
  );
}
