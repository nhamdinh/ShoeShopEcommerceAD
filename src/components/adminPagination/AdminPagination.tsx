import "./style.scss";
import { useEffect, useState } from "react";
import DoubleRightOutlined from "@ant-design/icons/lib/icons/DoubleRightOutlined";
import { Pagination } from "antd";
import DoubleLeftOutlined from "@ant-design/icons/lib/icons/DoubleLeftOutlined";

export default function AdminPagination({
  dataCount,
  params,
  currentPage,
  cb_setCurrentPage,
  cb_setParams,
  cb_setGoSearch,
}: any) {
  const [lastPage, setLastPage] = useState<any>(1);

  useEffect(() => {
    setLastPage(Math.ceil(dataCount / params.limit));
  }, [dataCount, params]);

  const handleChangePage = (page: number) => {
    cb_setCurrentPage(page);

    cb_setParams((prev: any) => ({
      ...prev,
      offset: prev.limit * (page - 1),
    }));
    cb_setGoSearch(new Date().getTime());
  };

  const handleFirstPage = () => {
    cb_setCurrentPage(1);

    cb_setParams((prev: any) => ({
      ...prev,
      offset: 0,
    }));
    cb_setGoSearch(new Date().getTime());
  };

  const handleLastPage = () => {
    cb_setCurrentPage(lastPage);

    cb_setParams((prev: any) => ({
      ...prev,
      offset: prev.limit * (lastPage - 1),
    }));
    cb_setGoSearch(new Date().getTime());
  };

  return (
    <div className="pagination-reviews">
      <DoubleLeftOutlined
        disabled={currentPage === 1 ? true : false}
        className={`pagination-icon ${
          currentPage === 1 ? "pagination-passive" : ""
        }`}
        onClick={handleFirstPage}
      />

      <Pagination
        pageSize={params.limit}
        onChange={handleChangePage}
        size="small"
        total={dataCount}
        current={currentPage}
      />
      <DoubleRightOutlined
        disabled={currentPage === lastPage ? true : false}
        className={`pagination-icon ${
          currentPage === lastPage ? "pagination-passive" : ""
        }`}
        onClick={handleLastPage}
      />
    </div>
  );
}
