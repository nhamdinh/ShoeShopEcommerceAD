import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { useGetProductsQuery } from "../../store/components/products/productsApi";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/constants";

const MainProducts = () => {
  const dispatch = useDispatch();


  const [callDel, setcallDel] = useState<any>({
    call: Date.now(),
    state: 3,
  });

  const [products, setdataFetched] = useState<any>([]);
  const { data, error, isSuccess, isLoading } = useGetProductsQuery(
    {
      page: 1,
      limit: 100,
      order: "desc",
      orderBy: "createdAt",
      keyword: "",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setdataFetched(data);
    }
  }, [data]);

  useEffect(() => {
    if (callDel.state === 1) {
      toast.success("Product Deleted", ToastObjects);
    }
    if (callDel.state === 2) {
      toast.error("Delete Product Failed ", ToastObjects);
    }
  }, [callDel]);

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products</h2>
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
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                />
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
                  <Product
                    product={product}
                    key={product._id}
                    callDelete={(sta: any) => {
                      setcallDel(sta);
                    }}
                  />
                ))}
              </div>
            )}

            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to="#">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;
