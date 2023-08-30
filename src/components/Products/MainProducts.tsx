import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { useGetProductsQuery } from "../../store/components/products/productsApi";
import Product from "./Product";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const MainProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [iterator, setiterator] = useState<any>([]);

  const location = useLocation();
  const [value, setValue] = useState<any>("");

  const [keyword, setKeyword] = useState<any>("");
  const [pagenumber, setpagenumber] = useState<any>(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setpagenumber(urlParams.get("page") ?? 1);
  }, [location.search]);

  const [params, setParams] = useState<any>({
    page: pagenumber ?? 1,
    limit: PAGE_SIZE,
    order: "desc",
    orderBy: "createdAt",
  });

  useEffect(() => {
    setParams({ ...params, page: pagenumber });
  }, [pagenumber]);

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [total, setTotal] = useState<any>(1);

  const [products, setdataFetched] = useState<any>([]);
  const {
    data: dataProducts,
    error,
    isSuccess,
    isLoading,
  } = useGetProductsQuery(
    {
      ...params,
      keyword: keyword ?? "",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setdataFetched(dataProducts?.products);
      setTotal(dataProducts?.totalPages);
      setCurrentPage(dataProducts?.page);
      //@ts-ignore
      setiterator([...Array(dataProducts?.totalPages).keys()]);
    }
  }, [dataProducts]);

  const submitHandler = (value: any) => {
    setKeyword(value);
    if (value.trim()) {
      navigate(`/products?search=${value.trim()}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">{t("Products")}</h2>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        submitHandler(value);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    onClick={() => {
                      submitHandler(value);
                    }}
                    className="search-button"
                  >
                    search
                  </button>
                </div>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Message
                variant="alert-danger"
                mess={JSON.stringify(error)}
              ></Message>
            ) : (
              <div className="row">
                {/* Products */}
                {products?.map((product: any) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            )}

            {total > 1 && (
              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li
                    className={
                      currentPage === 1 ? "page-item disabled" : "page-item"
                    }
                  >
                    <div
                      className="page-link"
                      onClick={() => {
                        navigate(
                          `/products?page=${currentPage - 1}&&search=${keyword}`
                        );
                      }}
                    >
                      Previous
                    </div>
                  </li>
                  {iterator.map((x: any) => (
                    <li
                      className={`page-item ${
                        x + 1 === currentPage ? "active" : ""
                      }`}
                      key={x + 1}
                    >
                      <div
                        onClick={() => {
                          navigate(
                            `/products?page=${x + 1}&&search=${keyword}`
                          );
                        }}
                        className="page-link"
                      >
                        {x + 1}
                      </div>
                    </li>
                  ))}
                  <li
                    className={
                      currentPage === total ? "page-item disabled" : "page-item"
                    }
                    onClick={() => {
                      navigate(
                        `/products?page=${currentPage + 1}&&search=${keyword}`
                      );
                    }}
                  >
                    <div className="page-link">Next</div>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;
