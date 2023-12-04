import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from ".";
import { useGetOrderAdQuery } from "../../store/components/orders/ordersApi";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../store/selector/RootSelector";

const OrderMain = () => {
  const userInfo = useSelector(getUserInfo);

  const [orders, setorders] = useState<any>([]);

  const [searchBy, setsearchBy] = useState<any>("email");
  const [keyword, setkeyword] = useState<any>("");

  const [params, setParams] = useState<any>({
    shopId: userInfo?._id,
    searchBy,
    keyword,
  });

  const {
    data: dataFetch,
    error,
    isSuccess,
    isLoading,
  } = useGetOrderAdQuery(params, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    setParams({
      ...params,
      shopId: userInfo?._id,
    });
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess) {
      let ods = dataFetch?.metadata.filter((order: any) => {
        // if (order?.shopId?._id === userInfo?._id) {
        // }
        return order;
      });

      setorders(ods);
    }
  }, [dataFetch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <div className="df">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  value={keyword}
                  onChange={(e) => setkeyword(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setParams({
                        ...params,
                        searchBy,
                        keyword: keyword.trim(),
                      });
                    }
                  }}
                />

                <select
                  className="select__user"
                  value={searchBy}
                  onChange={(e) => setsearchBy(e.target.value)}
                >
                  <option value={"email"}>{"email"}</option>
                  <option value={"phone"}>{"phone"}</option>
                </select>
                <button
                  type="submit"
                  onClick={() => {
                    setParams({ ...params, searchBy, keyword: keyword.trim() });
                  }}
                  className="search-button"
                >
                  search
                </button>
              </div>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger" mess={error}></Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
