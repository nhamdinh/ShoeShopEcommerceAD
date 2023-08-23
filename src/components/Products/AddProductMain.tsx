import "./style.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { ToastObjects } from "../../utils/constants";
import {
  useCreateProductMutation,
  useGetCategorysQuery,
} from "../../store/components/products/productsApi";

const AddProductMain = () => {
  const [category, setcategory] = useState<any>("");
  const [categorys, setdataFetched] = useState<any>([]);
  const {
    data,
    error: categoryserror,
    isSuccess,
    isLoading: isLoadingcategorys,
  } = useGetCategorysQuery(
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
      setdataFetched(data?.categorys);
      setcategory(data?.categorys[0]?.name);
    }
  }, [data]);

  const [name, setName] = useState<any>("");
  const [price, setPrice] = useState<any>(0);
  const [image, setImage] = useState<any>("");
  const [countInStock, setCountInStock] = useState<any>(0);
  const [description, setDescription] = useState<any>("");

  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const onCreateProduct = async (values: any) => {
    const res = await createProduct(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      toast.success("Product Added", ToastObjects);
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
    } else {
      toast.error("Product Add Fail", ToastObjects);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onCreateProduct({
      name,
      price,
      description,
      image,
      countInStock,
    });
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
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
                  {error && (
                    <Message
                      variant="alert-danger"
                      mess={JSON.stringify(error)}
                    ></Message>
                  )}
                  {isLoading && <Loading />}
                  <div className="mb-4">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Category</h6>
                      <select
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        {categorys.map((category: any, index: number) => (
                          <option key={index} value={category?.name}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                      type="number"
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
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
