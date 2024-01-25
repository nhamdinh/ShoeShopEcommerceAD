import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import ExportGio from "../components/ThuDung/ExportGio";
export default function ThuDungScreenBuy() {
  return (
    <main className="main-wrap">
      <ExportGio isBan={false} />
    </main>
  );
}
