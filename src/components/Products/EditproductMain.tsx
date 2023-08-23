import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { ToastObjects } from "../../utils/constants";
import {
  useGetProductsDetailQuery,
  useUpdateProductMutation,
} from "../../store/components/products/productsApi";
import { useLocation, useNavigate } from "react-router-dom";

const EditProductMain = () => {
  const location = useLocation();
  const [productId, setproductId] = useState<any>(
    location.pathname.split("/")[2]
  );
  useEffect(() => {
    setproductId(location.pathname.split("/")[2]);
  }, [location.pathname]);

  const [product, setdataFetched] = useState<any>({});
  const {
    data: dataFetch,
    error,
    isSuccess,
    isLoading,
  } = useGetProductsDetailQuery(
    {
      id: productId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setdataFetched(dataFetch);
    }
  }, [dataFetch]);

  const [name, setName] = useState<any>("");
  const [price, setPrice] = useState<any>("0");
  const [image, setImage] = useState<any>("");
  const [countInStock, setCountInStock] = useState<any>(0);
  const [description, setDescription] = useState<any>("");

  const [
    updateProduct,
    { isLoading: LoadingupdateProduct, error: errorupdateProduct },
  ] = useUpdateProductMutation();

  const onUpdateProduct = async (values: any) => {
    const res = await updateProduct(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      toast.success("Product Updated", ToastObjects);
    } else {
      toast.error("Product Update Fail", ToastObjects);

    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onUpdateProduct({
      productId: productId,
      name,
      price,
      description,
      image,
      countInStock,
    });
  };

  useEffect(() => {
    setName(product?.name);
    setDescription(product?.description);
    setCountInStock(product?.countInStock);
    setImage(product?.image);
    setPrice(product?.price);
  }, [product]);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorupdateProduct && (
                    <Message
                      variant="alert-danger"
                      mess={JSON.stringify(errorupdateProduct)}
                    ></Message>
                  )}
                  {LoadingupdateProduct && <Loading />}
                  {isLoading ? (
                    <Loading />
                  ) : error ? (
                    <Message
                      variant="alert-danger"
                      mess={JSON.stringify(error)}
                    ></Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows={7}
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
